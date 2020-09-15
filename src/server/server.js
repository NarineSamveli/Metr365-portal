const { Client } = require('pg')

const client = new Client({
user: '*',
password: '*',
database: '*',
host: '*',
port: 5432,
ssl: true
})

client.connect()

client.query(`select arl.rb_id, rl.title as label, rl.latitude as lat, rl.longitude as lng, rl.square, bc.title as class 
        from public.around_rb_list as arl 
        inner join public.rb_list as rl on arl.rb_id = rl.id 
        inner join public.building_classes as bc on rl.building_class_id = bc.id 
        where arl.around_id = 1`, (err, res) => {
    console.log(err, res.rows)
    client.end()
})
