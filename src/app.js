document.addEventListener('DOMContentLoaded', function () {
  const zodiacData = {
    1: {
      name: 'Овен',
      startMonth: 3,
      startDay: 21,
      endMonth: 4,
      endDay: 19,
      dates: '21 марта - 19 апреля',
      description:
        'Овен - первый знак зодиака, символ новых начинаний, энергии и лидерства. Представители этого знака активны, решительны и уверены в себе.',
      image: '/src/images/aries.png',
    },
    2: {
      name: 'Телец',
      startMonth: 4,
      startDay: 20,
      endMonth: 5,
      endDay: 20,
      dates: '20 апреля - 20 мая',
      description:
        'Телец - знак стабильности, практичности и надежности. Ценят комфорт, красоту и материальные блага.',
      image: '/src/images/taurus.png',
    },
    3: {
      name: 'Близнецы',
      startMonth: 5,
      startDay: 21,
      endMonth: 6,
      endDay: 20,
      dates: '21 мая - 20 июня',
      description:
        'Близнецы - знак общения, любопытства и адаптивности. Общительны, умны и всегда в поиске новой информации.',
      image: '/src/images/gemini.png',
    },
    4: {
      name: 'Рак',
      startMonth: 6,
      startDay: 21,
      endMonth: 7,
      endDay: 22,
      dates: '21 июня - 22 июля',
      description:
        'Рак - знак эмоций, семьи и заботы. Чувствительны, интуитивны и сильно привязаны к дому и близким.',
      image: '/src/images/cancer.png',
    },
    5: {
      name: 'Лев',
      startMonth: 7,
      startDay: 23,
      endMonth: 8,
      endDay: 22,
      dates: '23 июля - 22 августа',
      description:
        'Лев - знак творчества, лидерства и щедрости. Яркие личности, которые любят быть в центре внимания.',
      image: '/src/images/leo.png',
    },
    6: {
      name: 'Дева',
      startMonth: 8,
      startDay: 23,
      endMonth: 9,
      endDay: 22,
      dates: '23 августа - 22 сентября',
      description:
        'Дева - знак анализа, порядка и служения. Практичны, внимательны к деталям и стремятся к совершенству.',
      image: '/src/images/virgo.png',
    },
    7: {
      name: 'Весы',
      startMonth: 9,
      startDay: 23,
      endMonth: 10,
      endDay: 22,
      dates: '23 сентября - 22 октября',
      description:
        'Весы - знак гармонии, партнерства и красоты. Стремятся к балансу, справедливости и эстетике.',
      image: '/src/images/libra.png',
    },
    8: {
      name: 'Скорпион',
      startMonth: 10,
      startDay: 23,
      endMonth: 11,
      endDay: 21,
      dates: '23 октября - 21 ноября',
      description:
        'Скорпион - знак глубины, трансформации и страсти. Интенсивны, проницательны и обладают сильной волей.',
      image: '/src/images/scorp.png',
    },
    9: {
      name: 'Стрелец',
      startMonth: 11,
      startDay: 22,
      endMonth: 12,
      endDay: 21,
      dates: '22 ноября - 21 декабря',
      description:
        'Стрелец - знак путешествий, философии и свободы. Оптимистичны, любознательны и ценят независимость.',
      image: '/src/images/strel.png',
    },
    10: {
      name: 'Козерог',
      startMonth: 12,
      startDay: 22,
      endMonth: 1,
      endDay: 19,
      dates: '22 декабря - 19 января',
      description:
        'Козерог - знак амбиций, дисциплины и ответственности. Трудолюбивы, целеустремленны и практичны.',
      image: '/src/images/koz.png',
    },
    11: {
      name: 'Водолей',
      startMonth: 1,
      startDay: 20,
      endMonth: 2,
      endDay: 18,
      dates: '20 января - 18 февраля',
      description:
        'Водолей - знак инноваций, дружбы и гуманизма. Независимы, оригинальны и стремятся к прогрессу.',
      image: '/src/images/vodol.png',
    },
    12: {
      name: 'Рыбы',
      startMonth: 2,
      startDay: 19,
      endMonth: 3,
      endDay: 20,
      dates: '19 февраля - 20 марта',
      description:
        'Рыбы - знак интуиции, сострадания и творчества. Чувствительны, мечтательны и обладают богатым воображением.',
      image: '/src/images/rib.png',
    },
  };

  // Функция для проверки, попадает ли дата в интервал знака
  function isDateInZodiacRange(day, month, zodiac) {
    const dateValue = month * 100 + day;
    const startValue = zodiac.startMonth * 100 + zodiac.startDay;
    const endValue = zodiac.endMonth * 100 + zodiac.endDay;

    if (zodiac.startMonth > zodiac.endMonth) {
      return dateValue >= startValue || dateValue <= endValue;
    } else {
      return dateValue >= startValue && dateValue <= endValue;
    }
  }

  // Функция для определения знака зодиака по дате
  function findZodiacByDate(day, month) {
    for (const [zodiacNumber, zodiac] of Object.entries(zodiacData)) {
      if (isDateInZodiacRange(day, month, zodiac)) {
        return parseInt(zodiacNumber);
      }
    }
    return null;
  }

  // Функция для проверки валидности даты
  function isValidDate(day, month, year) {
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;

    const monthsWith30Days = [4, 6, 9, 11];
    if (monthsWith30Days.includes(month) && day > 30) return false;

    if (month === 2) {
      const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      return isLeapYear ? day <= 29 : day <= 28;
    }

    return true;
  }

  // Получаем элементы из HTML
  const dateInput = document.querySelector('.zodiac-input input[type="text"]');
  const button = document.querySelector('.zodiac-input button');
  const resultContainer = document.querySelector('.result-container');

  // Элементы результата
  const zodiacImg = document.getElementById('zodiac-img');
  const zodiacName = document.getElementById('zodiac-name');
  const zodiacDates = document.getElementById('zodiac-dates');
  const zodiacDescription = document.getElementById('zodiac-description');
  const birthDateElement = document.getElementById('birth-date');

  // Функция очистки поля даты
  function clearDateInput() {
    dateInput.value = '';
    dateInput.focus();
  }

  // Функция очистки результата
  function clearResult() {
    resultContainer.classList.remove('show');
    zodiacImg.src = '';
    zodiacImg.alt = '';
    zodiacName.textContent = '';
    zodiacDates.textContent = '';
    zodiacDescription.textContent = '';
    birthDateElement.innerHTML = '';
  }

  // Функция полной очистки
  function clearAll() {
    clearDateInput();
    clearResult();
  }

  // Основная функция обработки данных
  function processZodiacData() {
    const birthDate = dateInput.value.trim();

    if (!birthDate) {
      alert('Пожалуйста, введите дату рождения!');
      return;
    }

    const datePattern = /^(\d{2})\.(\d{2})\.(\d{2})$/;
    const match = birthDate.match(datePattern);

    if (!match) {
      alert('Введите дату в формате дд.мм.гг (например: 15.05.90)');
      return;
    }

    const day = parseInt(match[1]);
    const month = parseInt(match[2]);
    let year = parseInt(match[3]);

    if (year < 100) {
      year += 2000;
    }

    if (!isValidDate(day, month, year)) {
      alert('Введите корректную дату!');
      return;
    }

    const zodiacNumber = findZodiacByDate(day, month);

    if (zodiacNumber === null) {
      alert('Не удалось определить знак зодиака по указанной дате!');
      return;
    }

    const zodiac = zodiacData[zodiacNumber];
    const formattedDate = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;

    // Заполняем данные
    zodiacImg.src = zodiac.image;
    zodiacImg.alt = zodiac.name;
    zodiacName.textContent = zodiac.name;
    zodiacDates.textContent = `Период: ${zodiac.dates}`;
    zodiacDescription.textContent = zodiac.description;
    birthDateElement.innerHTML = `<strong>Дата рождения:</strong> ${formattedDate}`;

    // Показываем контейнер с результатом
    resultContainer.classList.add('show');

    if (window.innerWidth < 768) {
      resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // ========== ОБРАБОТЧИКИ СОБЫТИЙ ==========

  // Основные обработчики
  button.addEventListener('click', processZodiacData);

  dateInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      processZodiacData();
    }
  });

  // Автоматическое форматирование даты
  dateInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 6) {
      value = value.substring(0, 6);
    }

    if (value.length >= 5) {
      value = value.substring(0, 2) + '.' + value.substring(2, 4) + '.' + value.substring(4, 6);
    } else if (value.length >= 3) {
      value = value.substring(0, 2) + '.' + value.substring(2, 4);
    }

    e.target.value = value;
  });

  // Очистка результата при вводе новой даты
  dateInput.addEventListener('input', clearResult);

  // Очистка поля даты двойным кликом
  dateInput.addEventListener('dblclick', clearDateInput);

  // Полная очистка при Ctrl + клик на кнопку
  button.addEventListener('click', function (e) {
    if (e.ctrlKey) {
      e.preventDefault();
      clearAll();
    }
  });
});
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    zodiacData,
    isDateInZodiacRange,
    findZodiacByDate,
    isValidDate,
  };
}
