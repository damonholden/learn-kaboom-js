kaboom({
  background: [255, 255, 255],
});

loadSprite('larvitar', 'sprites/larvitar.png');
let score = 0;

scene('game', () => {
  const larvitar = add([sprite('larvitar'), pos(80, 40), area(), body()]);

  larvitar.onCollide('tree', () => {
    addKaboom(larvitar.pos);
    shake();
    go('lose'); // go to "lose" scene here
  });

  onKeyPress('space', () => {
    if (larvitar.isGrounded()) larvitar.jump();
  });

  onTouchStart(() => {
    if (larvitar.isGrounded()) larvitar.jump();
  });

  add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    solid(),
    color(127, 200, 255),
  ]);

  spawnTree = () => {
    add([
      'tree',
      rect(48, rand(24, 64)),
      area(),
      outline(4),
      pos(width(), height() - 48),
      origin('botleft'),
      color(255, 180, 255),
      move(LEFT, 240),
    ]);
    wait(rand(0.5, 1.5), () => {
      spawnTree();
    });
  };

  spawnTree();
  score = 0;
  const scoreLabel = add([text(score), pos(24, 24)]);

  onUpdate(() => {
    score++;
    scoreLabel.text = score;
  });
});

scene('lose', () => {
  add([text(`Game Over\nScore: ${score}`), pos(center()), origin('center')]);
  onKeyPress('space', () => {
    go('game');
  });
});

go('game');
