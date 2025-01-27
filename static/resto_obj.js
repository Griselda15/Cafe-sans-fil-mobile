class MenuItems {
    constructor(name='', description='', price='', imageURL='', category='', slug='', restoSlug='') {
      this.name = name;
      this.description = description;
      this.price = price;
      this.image = imageURL;
      this.category = category;
      this.slug = slug;
      this.restoSlug = restoSlug;
    }
    static jsonToMenu(json, restoSlug){
      //console.log(json);
      let name = json['name'];
      let description = json['description'];
      let price = json['price'];
      let image = json['image_url'];
      let category = json['category'];
      let slug = json['slug'];
      return new MenuItems(name,description,price,image,category,slug, restoSlug);
    }
  }
  
  class Restaurent {
    constructor (name='', description='', imageURL='', location='', slug='', menu=[]) {
      this.name = name;
      this.description = description;
      //this.opHours = opHours;
      //this.isOp=isOp;
      this.image = imageURL;
      this.location = location;
      this.slug = slug;
      this.menu = menu;
  
      //create array of categories for all items in menu
      let menuCatSet = new Set();
      for(let i = 0; i<this.menu.length; i++){
        menuCatSet.add(this.menu[i].category);
      }
      this.menuCat = Array.from(menuCatSet);
    }

    //return all menu items of same category
    menuItemCat(cat) {
      let res = [];
      for(let i = 0; i<this.menu.length; i++){
        if(this.menu[i].category==cat){
          res.push(this.menu[i]);
        }
      }
      return res;
    }

    //create resaurent obj from json
    static jsonToResto(json){
      let name = json['name'];
      let description = json['description'];
      let image = json['image_url'];
      let location = json['location']['pavillon']+" "+json['location']['local'];
      let slug = json['slug'];
  
      //get list of items in json
      let jsonList = json['menu_items'];      
      //get list of index for menu items
      let indList = Object.keys(jsonList);
  
      //append each item to list
      let menuList = [];
      for (let i = 0; i<indList.length; i++){
        menuList.push(MenuItems.jsonToMenu(jsonList[indList[i]],slug));
      }
  
      return new Restaurent(name,description,image,location,slug,menuList);
    }
  }
export {Restaurent, MenuItems};
