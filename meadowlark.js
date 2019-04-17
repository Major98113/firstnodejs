var express = require('express');
var fortune = require('./lib/fortune.js'); //точка в самом начале пути значит что не нужно искать модуль в папке node_modules
var app = express(); // Установка механизма представления handlebars
app.set('port', process.env.PORT || 3000);
var handlebars = require('express-handlebars')
    .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public')); // делает доступными для любого пользователя файлы из папки public



app.get('/', function(req, res) {
    res.render('home');
});
app.get('/about', function(req, res) {
    var randomFortune =
        fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: fortune.getFortune() });
});
// Обобщенный обработчик 404 (промежуточное ПО)
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});
// Обработчик ошибки 500 (промежуточное ПО)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log( 'Express запущен на http://localhost:' +
        app.get('port') + '; нажмите Ctrl+C для завершения.' );
});