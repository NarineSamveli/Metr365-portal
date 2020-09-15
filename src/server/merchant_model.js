const Pool = require('pg').Pool
const pool = new Pool({
  user: '*',
  host: '*',
  database: '*',
  password: '*',
  port: 5432,
  ssl: true
});


const getMerchants = () => {
  return new Promise(function(resolve, reject) {
    pool.query(`select fp.price_actual_date, arl.rb_id, rl.title as label, rl.latitude as lat, rl.longitude as lng, rl.square, bc.title as class,
    sum(fp.price/fp.total_area) as price_area, sum(fp.price) as price, sum(fp.total_area) as area, count(fp.rb_id) as count
    from public.around_rb_list as arl 
    inner join public.rb_list as rl on arl.rb_id = rl.id 
    inner join public.building_classes as bc on rl.building_class_id = bc.id 
    inner join public.flat_prices as fp on arl.rb_id = fp.rb_id
    where arl.around_id = 1 and fp.price_actual_date between '2020-08-22' and '2020-08-23'
    GROUP BY fp.price_actual_date, arl.rb_id, rl.title, rl.latitude, rl.longitude, rl.square, bc.title`, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}


module.exports = {
  getMerchants
}