process.stdin.on('data', function(data) {
    process.stdout.write("\nHas escrito " + data.toString().trim() + "\n");
	process.exit();
});

process.stdout.write ("¿Cuál es tu hobby favorito?: ");
