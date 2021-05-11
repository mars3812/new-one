/ * узел eslint-env * /
const axios = require ('axios');
const addDays = require ('date-fns / addDays');

function getDate (d = new Date ()) {
  вернуть d.toJSON (). split ('T') [0];
}

// проверяет структуру json так, как мы ожидали
function test () {
  вернуть аксиомы
    .получать(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=$ {getDate ()} & api_key = DEMO_KEY`
    )
    .then (({данные}) => {
      const day = getDate (addDays (новая дата (), 1));

      // это также будет сгенерировано, если мы не можем получить доступ к значению
      пусть dayData = null;
      пытаться {
        dayData = data.near_earth_objects [день];
      } catch (e) {
        выбросить новую ошибку (
          'Неожиданная структура данных, искал: root.near_earth_objects [array]'
        );
      }

      if (! dayData) {
        выкидывать новую ошибку («Пропущен любой день на завтра»);
      }

      const first = dayData [0];
      if (typeof first.is_potenfully_hazardous_asteroid === 'undefined') {
        выбросить новую ошибку (
          'Отсутствует ключ "is_potential_hazardous_asteroid" из первой точки данных, предполагая, что оставшиеся данные неверны.'
        );
      }
    });
}

test (). catch ((e) => {
  console.log (`Ошибка: $ {e.message}`);
  process.exit (1);
});