export type Action =
  | 'turnLeft'
  | 'turnRight'
  | 'moveForward'
  | 'moveBackward'
  | 'moveLeft'
  | 'moveRight'
  | 'interact';

export const getAction = (code: string): Action | null => {
  switch (code) {
    case 'ArrowLeft':
    case 'KeyQ':
      return 'turnLeft';
    case 'ArrowRight':
    case 'KeyE':
      return 'turnRight';
    case 'ArrowUp':
    case 'KeyW':
      return 'moveForward';
    case 'ArrowDown':
    case 'KeyS':
      return 'moveBackward';
    case 'KeyA':
      return 'moveLeft';
    case 'KeyD':
      return 'moveRight';
    case 'KeyF':
      return 'interact';
    default:
      return null;
  }
};
