// Knight Movement Utility
const KnightMoves = () => {
    // Possible knight move offsets
    const MOVES = [
      [-2, -1], [-2, 1],   // Two steps up/down, one step sideways
      [-1, -2], [-1, 2],   // One step up/down, two steps sideways
      [1, -2], [1, 2],
      [2, -1], [2, 1]
    ];
  
    // Check if position is valid on the board
    const isValidPosition = ([x, y]) => 
      x >= 0 && x < 8 && y >= 0 && y < 8;
  
    // Find shortest path between two positions
    const findShortestPath = (start, end) => {
      // Queue to track paths
      const queue = [[start]];
      
      // Track visited positions
      const visited = new Set([start.toString()]);
  
      while (queue.length) {
        // Get current path
        const currentPath = queue.shift();
        const currentPos = currentPath[currentPath.length - 1];
  
        // Check if destination reached
        if (currentPos[0] === end[0] && currentPos[1] === end[1]) {
          return currentPath;
        }
  
        // Explore possible moves
        for (const [dx, dy] of MOVES) {
          const nextPos = [
            currentPos[0] + dx, 
            currentPos[1] + dy
          ];
  
          // Validate and track new positions
          if (
            isValidPosition(nextPos) && 
            !visited.has(nextPos.toString())
          ) {
            visited.add(nextPos.toString());
            queue.push([...currentPath, nextPos]);
          }
        }
      }
  
      return null; // No path found
    };
  
    // Public method to find knight's path
    const knightMoves = (start, end) => {
      const path = findShortestPath(start, end);
  
      if (!path) {
        console.log("No path possible");
        return;
      }
  
      console.log(`Moves required: ${path.length - 1}`);
      console.log("Path:");
      path.forEach(pos => console.log(pos));
  
      return path;
    };
  
    return { knightMoves };
  };
  
  // Create Knight Move Utility
  const knight = KnightMoves();
  
  // Test Scenarios
  const testScenarios = [
    [[0, 0], [1, 2]],    // Simple move
    [[0, 0], [3, 3]],    // Moderate move
    [[3, 3], [0, 0]],    // Reverse move
    [[0, 0], [7, 7]]     // Long path
  ];
  
  // Run test scenarios
  testScenarios.forEach(([start, end]) => {
    console.log(`\n--- Path from ${start} to ${end} ---`);
    knight.knightMoves(start, end);
  });