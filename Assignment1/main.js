var AM = new AssetManager();

AM.queueDownload("./img/guy1.png");
AM.queueDownload("./img/space.png")
AM.queueDownload("./img/background.jpg");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();

    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.jpg")));
    gameEngine.addEntity(new Goku(gameEngine, AM.getAsset("./img/guy1.png")));
    gameEngine.addEntity(new Angel(gameEngine, AM.getAsset("./img/space.png"), 0, 0));
    
    console.log("All Done!");
});