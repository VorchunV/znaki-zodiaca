/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Zodiac App - Полные тесты', () => {
  let app;
  
  beforeEach(() => {
    // Загружаем HTML
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    document.documentElement.innerHTML = html;
    
    jest.resetModules();
    app = require('../app.js');
    
  });

  describe('1. Данные знаков зодиака', () => {
    test('zodiacData содержит 12 знаков', () => {
      expect(Object.keys(app.zodiacData)).toHaveLength(12);
    });

    test('каждый знак имеет все необходимые поля', () => {
      Object.values(app.zodiacData).forEach(zodiac => {
        expect(zodiac).toHaveProperty('name');
        expect(zodiac).toHaveProperty('startMonth');
        expect(zodiac).toHaveProperty('startDay');
        expect(zodiac).toHaveProperty('endMonth');
        expect(zodiac).toHaveProperty('endDay');
        expect(zodiac).toHaveProperty('dates');
        expect(zodiac).toHaveProperty('description');
        expect(zodiac).toHaveProperty('image');
      });
    });

    test('Овен имеет правильные даты', () => {
      const oвен = app.zodiacData[1];
      expect(oвен.name).toBe('Овен');
      expect(oвен.startMonth).toBe(3);
      expect(oвен.startDay).toBe(21);
      expect(oвен.endMonth).toBe(4);
      expect(oвен.endDay).toBe(19);
    });
  });

  describe('2. Функция isDateInZodiacRange', () => {
    test('Овен: с 21 марта по 19 апреля', () => {
      const овен = app.zodiacData[1];
      
      // Границы
      expect(app.isDateInZodiacRange(21, 3, овен)).toBe(true);
      expect(app.isDateInZodiacRange(19, 4, овен)).toBe(true);
      
      // Внутри
      expect(app.isDateInZodiacRange(15, 4, овен)).toBe(true);
      
      // Снаружи
      expect(app.isDateInZodiacRange(20, 3, овен)).toBe(false);
      expect(app.isDateInZodiacRange(20, 4, овен)).toBe(false);
    });

    test('Козерог: переход через год (22 дек - 19 янв)', () => {
      const козерог = app.zodiacData[10];
      
      expect(app.isDateInZodiacRange(22, 12, козерог)).toBe(true);
      expect(app.isDateInZodiacRange(19, 1, козерог)).toBe(true);
      expect(app.isDateInZodiacRange(25, 12, козерог)).toBe(true);
      expect(app.isDateInZodiacRange(15, 1, козерог)).toBe(true);
      
      expect(app.isDateInZodiacRange(21, 12, козерог)).toBe(false);
      expect(app.isDateInZodiacRange(20, 1, козерог)).toBe(false);
    });

    test('Водолей: 20 янв - 18 фев', () => {
      const водолей = app.zodiacData[11];
      
      expect(app.isDateInZodiacRange(20, 1, водолей)).toBe(true);
      expect(app.isDateInZodiacRange(18, 2, водолей)).toBe(true);
      expect(app.isDateInZodiacRange(1, 2, водолей)).toBe(true);
      
      expect(app.isDateInZodiacRange(19, 1, водолей)).toBe(false);
      expect(app.isDateInZodiacRange(19, 2, водолей)).toBe(false);
    });
  });

  describe('3. Функция findZodiacByDate', () => {
    test('возвращает правильный номер знака', () => {
      expect(app.findZodiacByDate(15, 3)).toBe(1);   // Овен
      expect(app.findZodiacByDate(15, 5)).toBe(2);   // Телец
      expect(app.findZodiacByDate(15, 6)).toBe(3);   // Близнецы
      expect(app.findZodiacByDate(15, 7)).toBe(5);   // Лев
      expect(app.findZodiacByDate(15, 9)).toBe(7);   // Весы
      expect(app.findZodiacByDate(25, 12)).toBe(10); // Козерог
      expect(app.findZodiacByDate(15, 2)).toBe(11);  // Водолей
      expect(app.findZodiacByDate(10, 3)).toBe(12);  // Рыбы
    });

    test('возвращает null для несуществующей даты', () => {
      expect(app.findZodiacByDate(32, 1)).toBe(null);
      expect(app.findZodiacByDate(15, 13)).toBe(null);
    });
  });

  describe('4. Функция isValidDate', () => {
    test('валидные даты', () => {
      expect(app.isValidDate(15, 3, 99)).toBe(true);
      expect(app.isValidDate(31, 1, 99)).toBe(true);
      expect(app.isValidDate(30, 4, 99)).toBe(true);
      expect(app.isValidDate(29, 2, 2000)).toBe(true);  // Високосный
      expect(app.isValidDate(28, 2, 99)).toBe(true);  // Невисокосный
    });

    test('невалидные даты', () => {
      expect(app.isValidDate(32, 1, 89)).toBe(false);
      expect(app.isValidDate(0, 1, 89)).toBe(false);
      expect(app.isValidDate(15, 0, 89)).toBe(false);
      expect(app.isValidDate(15, 13, 89)).toBe(false);
      expect(app.isValidDate(31, 4, 89)).toBe(false); // Апрель - 30 дней
      expect(app.isValidDate(31, 6, 89)).toBe(false); // Июнь - 30 дней
      expect(app.isValidDate(29, 2, 2001)).toBe(false); // Невисокосный
      expect(app.isValidDate(30, 2, 89)).toBe(false); // Февраль - максимум 29
    });
  });

  describe('5. DOM элементы', () => {
    test('все необходимые элементы присутствуют', () => {
      expect(document.querySelector('.zodiac-input input[type="text"]')).toBeTruthy();
      expect(document.querySelector('.zodiac-input button')).toBeTruthy();
      expect(document.querySelector('.result-container')).toBeTruthy();
      expect(document.getElementById('zodiac-img')).toBeTruthy();
      expect(document.getElementById('zodiac-name')).toBeTruthy();
      expect(document.getElementById('zodiac-dates')).toBeTruthy();
      expect(document.getElementById('zodiac-description')).toBeTruthy();
      expect(document.getElementById('birth-date')).toBeTruthy();
    });
  });

  describe('6. Форматирование даты', () => {
    test('автоматически добавляет точки', () => {
      const input = document.querySelector('.zodiac-input input[type="text"]');
      
      input.value = '150390';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      
      expect(input.value).toBe('15.03.90');
    });

    test('форматирует 6 цифр в дд.мм.гг', () => {
      const input = document.querySelector('.zodiac-input input[type="text"]');
      
      const testCases = [
        { input: '010190', output: '01.01.90' },
        { input: '311290', output: '31.12.90' },
        { input: '070790', output: '07.07.90' }
      ];
      
      testCases.forEach(({ input: testInput, output }) => {
        input.value = testInput;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        expect(input.value).toBe(output);
      });
    });

    test('ограничивает длину до 6 цифр', () => {
      const input = document.querySelector('.zodiac-input input[type="text"]');
      
      input.value = '15039012345';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      
      expect(input.value).toBe('15.03.90');
      expect(input.value.length).toBe(8); // dd.mm.yy = 8 символов
    });
  });
});