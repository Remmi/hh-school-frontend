var
    buttonPrevious, buttonNext, buttonToday, buttonAdd, buttonRefresh,
    calendar, labelCalendar, divCalendar;

// выборка элементов
buttonPrevious = document.getElementById('date-nav-prev');
buttonNext = document.getElementById('date-nav-next');
buttonToday = document.getElementById('date-nav-today');
buttonAdd = document.getElementById('header-content-button-add');
buttonRefresh = document.getElementById('header-content-button-refresh');

/**
 * Конструктор для календаря
 */
labelCalendar = document.getElementById('date-nav-month');
divCalendar = document.getElementById('date-calendar');

function dateCalendar() {
    var months, days, nowDate,
        curMonth, curYear;

    nowDate = new Date();
    nowDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());

    months = {
        '0': 'Январь',
        '1': 'Февраль',
        '2': 'Март',
        '3': 'Апрель',
        '4': 'Май',
        '5': 'Июнь',
        '6': 'Июль',
        '7': 'Август',
        '8': 'Сентябрь',
        '9': 'Октябрь',
        '10': 'Ноябрь',
        '11': 'Декабрь'
    };

    days = {
        '0': 'Воскресенье',
        '1': 'Понедельник',
        '2': 'Вторник',
        '3': 'Среда',
        '4': 'Четверг',
        '5': 'Пятница',
        '6': 'Суббота'
    };

    /**
     * monthBorders вычисляет границы отображаемого месяца
     * @param year
     * @param month
     * @returns {Array}
     */
    var monthBorders = function (year, month) {
        var firstMDay, fMWDay, firstDay, lastDay, lMWDay;
        firstMDay = new Date(year, month, 1);
        fMWDay = firstMDay.getDay();
        firstDay = firstMDay.setDate(firstMDay.getDate() - 6);
        if (fMWDay != 0) {
            firstDay = firstMDay.setDate(firstMDay.getDate() - fMWDay + 1);
        }
        lastDay = new Date(year, month + 1, 0);
        lMWDay = lastDay.getDay();
        if (lMWDay != 0) {
            lastDay = lastDay.setDate(lastDay.getDate() + 7 - lMWDay);
        }
        return [firstMDay, new Date(lastDay)];
    }

    this.year = nowDate.getFullYear();
    this.month = nowDate.getMonth();

    curMonth = this.month;
    curYear = this.year;

    var compareDates = function (firstDate, secondDate) {
        if (firstDate.getDate() != secondDate.getDate()) {
            return false;
        }
        if (firstDate.getMonth() != secondDate.getMonth()) {
            return false;
        }
        if (firstDate.getFullYear() != secondDate.getFullYear()) {
            return false;
        }
        return true;
    }

    /**
     * Отрисовка календаря на месяц
     * @param startDay
     * @param endDay
     * @returns {string}
     */
    function renderCalendar(startDay, endDay) {
        var table = ['<table class="date-calendar"><tr>'];
        var i = 0;
        var currDay = startDay;

        while (currDay.getTime() <= endDay.getTime()) {
            i++;
            if (i <= 7) {
                if (!compareDates(currDay, nowDate)) {
                    table.push('<td>' + days[currDay.getDay()] + ', ' + currDay.getDate() + '</td>');
                }
                else {
                    table.push('<td class="date-today">' + days[currDay.getDay()] + ', ' + currDay.getDate() + '</td>');
                }
            }
            else {
                if (!compareDates(currDay, nowDate)) {
                    table.push('<td>' + currDay.getDate() + '</td>');
                }
                else {
                    table.push('<td class="date-today">' + currDay.getDate() + '</td>');
                }
            }
            if (i % 7 === 0) {
                table.push('</tr><tr>');
            }
            currDay.setDate(currDay.getDate() + 1);
        }

        table.push('</tr></table>');
        return table.join('\n');
    }

    /**
     * Отображает календарь, меняет название месяца
     * и отключает кнопку для текущего месяца
     * @returns {*}
     */
    this.showCalendar = function () {
        var dateBorders = monthBorders(this.year, this.month);
        labelCalendar.innerHTML = months[this.month] + ' ' + this.year;
        if ((this.month === curMonth) && (this.year === curYear)) {
            buttonToday.style.cursor = 'default';
            buttonToday.style.color = '#b8b8b8';
        }
        else {
            buttonToday.style.cursor = 'pointer';
            buttonToday.style.color = '#666';
        }
        divCalendar.innerHTML = renderCalendar(dateBorders[0], dateBorders[1]);
        return this;
    }

    /**
     * Переходит на прошлый месяц
     * @returns {*}
     */
    this.prev = function () {
        if (this.month > 0) {
            this.month = this.month - 1;
        }
        else {
            this.year = this.year - 1;
            this.month = 11;
        }
        return this;
    }

    /**
     * Переходит на следующий месяц
     * @returns {*}
     */
    this.next = function () {
        if (this.month < 11) {
            this.month = this.month + 1;
        }
        else {
            this.year = this.year + 1;
            this.month = 0;
        }
        return this;
    }

    this.current = function () {
        this.month = curMonth;
        this.year = curYear;
        return this;
    }
}

calendar = new dateCalendar().showCalendar();

/**
 * Навигация по датам:
 * - предыдущий месяц
 * - следующий месяц
 * - текущий месяц
 */

// прошлый месяц
buttonPrevious.onclick = function () {
    calendar.prev().showCalendar();
}

// следующий месяц
buttonNext.onclick = function () {
    calendar.next().showCalendar();
}

// текущий месяц
buttonToday.onclick = function () {
    calendar = calendar.current().showCalendar();
}

/* Работа с событиями */