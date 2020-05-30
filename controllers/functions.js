const data = [{ menuName: "Hot dogs", menu: [{ dishId: '1', dish_has_categories: [{ CategoryId: '8' }] }, { dishId: '2', dish_has_categories: [{ CategoryId: '9' }] }] }, { menuName: "Burgers", menu: [{ dishId: '3', dish_has_categories: [{ CategoryId: '6' }] }, { dishId: '4', dish_has_categories: [{ CategoryId: '4' }] }] }, { name: "Drinks", menu: [] }]

let op = data.filter(val => {
    let menu = val.menu.some(({ dish_has_categories }) => dish_has_categories.some(({ CategoryId }) => CategoryId === '8'))
    return menu
})

console.log('filtered values -->\n', op)

let names = op.map(({ menuName }) => menuName)

console.log('Names --> \n', names)