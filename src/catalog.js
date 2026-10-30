const image = id => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=700&q=80';
export const plants = [
  {id: 1, name: 'Monstera Deliciosa', category: 'Statement Plants', price: 35, image: image('photo-1501004318641-b39e6451bec6')},
  {id: 2, name: 'Fiddle Leaf Fig', category: 'Statement Plants', price: 49, image: image('photo-1485955900006-10f4d324d411')},
  {id: 3, name: 'Snake Plant', category: 'Easy Care', price: 22, image: image('photo-1593482892290-f54927ae2b7e')},
  {id: 4, name: 'Golden Pothos', category: 'Easy Care', price: 18, image: image('photo-1416879595882-3373a0480b5b')},
  {id: 5, name: 'Peace Lily', category: 'Flowering Favorites', price: 29, image: image('photo-1497250681960-ef046c08a56e')},
  {id: 6, name: 'Anthurium', category: 'Flowering Favorites', price: 32, image: image('photo-1463320726281-696a485928c7')}
];
