export function moveTowards(trainer, destinationPosition, speed) {
    let distanceToTravelX = destinationPosition.x - trainer.position.x;
    let distanceToTravelY = destinationPosition.y - trainer.position.y;

    let distance = Math.sqrt(distanceToTravelX**2 + distanceToTravelY**2);

    if (distance <= speed) {
        // if close enough, just move directly to destination
        trainer.position.x = destinationPosition.x;
        trainer.position.y = destinationPosition.y;
    } else {
        // otherwise, move by specified speed in direction of destination
        let normalizedX = distanceToTravelX / distance;
        let normalizedY = distanceToTravelY / distance;

        trainer.position.x += normalizedX * speed;
        trainer.position.y += normalizedY * speed;
    }

    return distance;
}
