// NARROWING STUFF
// function formatStatistic(stat: string | number) {
//   if (typeof stat === 'number') {
//     return stat.toFixed(2);
//   }
//   if (typeof stat === 'string') {
//     return stat.toUpperCase();
//   }
// }

// type Metal = {
//   magnetize: () => string;
// }

// type Glass = {
//   melt: () => string;
// }

// function recycle(trash: Metal | Glass) {
//   // Add your code below:
//   if ('magnetize' in trash) {
//     return trash.magnetize()
//   }
  
//   return trash.melt();
// }

// type guarding with the is keyword?
