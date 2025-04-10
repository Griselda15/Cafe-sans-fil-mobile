import Button from "@/components/common/Buttons/Button";
import IconButton from "@/components/common/Buttons/IconButton";
import ArticleCard from "@/components/common/Cards/ArticleCard";
import Counter from "@/components/common/Inputs/Counter";
import Tooltip from "@/components/common/Tooltip";
import COLORS from "@/constants/Colors";
import SPACING from "@/constants/Spacing";
import TYPOGRAPHY from "@/constants/Typography";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  Search,
  Locate,
  Heart,
  Star,
  Vegan,
  ThumbsUp,
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, KeyboardAvoidingView,
  Platform,
  ScrollView, } from "react-native";

import { Item } from "@/constants/types/GET_item";
import { fetchSync, saveSecurely, saveSync } from "@/scripts/storage";
import * as hash from "object-hash";

import { fetchPannier } from "@/scripts/pannier";

export default function ArticleScreen() {
  const { id, articleId } = useLocalSearchParams();
  console.log("Café Id", id);
  const [reload, setReload] = useState(false);
  console.log("Article Id", articleId) ;
  const formatPrice = (price: string) => {
    if (price.charAt(price.length - 2) == ".") {
      return price + "0";
    }
    else{
      return price
    }
  }

  const scrollViewRef = useRef<ScrollView>(null);

  const [menuItem, setMenuItem] = useState<Item | any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    const fetchMenuItem = async () =>{
      try {
        console.log(`test cafe slug ${id}`);
        console.log(`article slug ${articleId}`);
        //console.log(`https://cafesansfil-api-r0kj.onrender.com/api/cafes/${id}/menu/${articleId}`);
        const response = await fetch(`https://cafesansfil-api-r0kj.onrender.com/api/cafes/${id}/menu/items/${articleId}`);
        const json = await response.json();
        //console.log(json.image_url);
        setMenuItem(json);
      } catch (error) {
          console.error('Fetch error:', error);
      } finally{
        setLoading(false);
      }
    }
    fetchMenuItem();
  }, [articleId]);


  const panierID = "12345";
  function addToCart(){
    //get current list of items from cart
    let currCart = new Array();
    try{
      currCart = fetchSync(panierID);
      //console.log("here");
      //console.log(currCart);
      if (!currCart){
        currCart = new Array();
        saveSync(panierID,currCart);
      }
      console.log("here");
      console.log(fetchSync(panierID));
    }catch(error){
      currCart = new Array();
    }

    type panierItem = {
      id : string;
      quantity:number;
    };
    //check for same item
    let currQuantity = 1;
    let itemHash = hash.MD5(menuItem);

    for(const item of currCart){
      if(item.id == itemHash){
        currQuantity = currQuantity + item.quantity;
        item.quantity = currQuantity;
        break;
      }
    };

    //add new item
    if(currQuantity == 1){
      saveSync(itemHash, menuItem);
      let newItem : panierItem = {
        id:itemHash,
        quantity:1
      };
      currCart.push(newItem);
      //console.log("here");
      //console.log(fetchSync(panierID));
    }
    saveSync(panierID,currCart);
    
    //push to panier (might remove)
    router.push('/pannier');
    
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={[{ backgroundColor: COLORS.white }]}>
      <View>
        <Image
          style={styles.cafeBackgroundImage}
          source={loading ? require("@/assets/images/placeholder/image2xl.png") : {uri: menuItem.image_url}}
        />

        <View style={styles.cafeHeaderButtons}>
          <IconButton
            Icon={ArrowLeft}
            onPress={() => router.push(`/cafe/${id}`)}
            style={styles.cafeHeaderIconButtons}
          />
          <View style={styles.cafeHeaderButtonsRight}>
            <IconButton Icon={Heart} style={styles.cafeHeaderIconButtons} />
          </View>
        </View>

        <View style={styles.cafeHeaderOpenStatus}>
          <Tooltip label={"En Stock"} showChevron={false} status="green" />
        </View>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            marginTop: 28,
            marginBottom: 10,
          }}
        >
          <Text style={TYPOGRAPHY.heading.medium.bold}>{loading? "is loading": menuItem.name}</Text>
          <Text style={[TYPOGRAPHY.heading.medium.bold, { color: "#656565" }]}>
            {loading? "is loading" : `$${formatPrice(menuItem.price)}`}
          </Text>
        </View>
        <Text
          style={[
            TYPOGRAPHY.body.large.base,
            { color: COLORS.subtuleDark, lineHeight: 21 },
          ]}
        >
          {loading ? "": menuItem.description}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 12,
          paddingHorizontal: 16,
          marginTop: 20,
          marginBottom: 28,
        }}
      >
        <Tooltip label="95%" Icon={ThumbsUp} showChevron={false}></Tooltip>
        <Tooltip label="Populaire" showChevron={false} />
      </View>

      <View style={{ borderTopWidth: 3, borderBottomWidth: 3, borderColor: COLORS.lightGray, paddingHorizontal: 16 }}>
        <View style={{ marginBlock: 20 }}>
          <Text style={[TYPOGRAPHY.heading.small.bold]}>Taille de la boisson</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 24 }}>
          <View style={{ backgroundColor: COLORS.lightGray, paddingVertical: 12, borderRadius: 10, flex: 1,  }}>
            <Text style={[TYPOGRAPHY.body.normal.semiBold, { textAlign: "center" }]}>Petite</Text>
          </View>
          <View style={{ backgroundColor: COLORS.lightGray, paddingVertical: 12, borderRadius: 10, flex: 1,  }}>
            <Text style={[TYPOGRAPHY.body.normal.semiBold, { textAlign: "center" }]}>Moyenne</Text>
          </View>
          <View style={{ backgroundColor: COLORS.lightGray, paddingVertical: 12, borderRadius: 10, flex: 1,  }}>
            <Text style={[TYPOGRAPHY.body.normal.semiBold, { textAlign: "center" }]}>Grande</Text>
          </View>
        </View>
      </View>
      <View style={{ borderBottomWidth: 3, borderColor: COLORS.lightGray, paddingHorizontal: 16 }}>
        <View style={{ marginBlock: 20, gap: 8 }}>
          <Text style={[TYPOGRAPHY.heading.small.bold]}>Options extras</Text>
          <Text
          style={[
            TYPOGRAPHY.body.large.base,
            { color: COLORS.subtuleDark, lineHeight: 21 },
          ]}
        >
          Sélectionnez les options qui vous intéressent.
        </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 24 }}>
          <View style={{ backgroundColor: COLORS.lightGray, paddingVertical: 12, borderRadius: 10, flex: 1,  }}>
            <Text style={[TYPOGRAPHY.body.normal.semiBold, { textAlign: "center" }]}>Frites</Text>
          </View>
          <View style={{ backgroundColor: COLORS.lightGray, paddingVertical: 12, borderRadius: 10, flex: 1,  }}>
            <Text style={[TYPOGRAPHY.body.normal.semiBold, { textAlign: "center" }]}>Burger</Text>
          </View>
          <View style={{ backgroundColor: COLORS.lightGray, paddingVertical: 12, borderRadius: 10, flex: 1,  }}>
            <Text style={[TYPOGRAPHY.body.normal.semiBold, { textAlign: "center" }]}>Pizza</Text>
          </View>
          <View style={{ backgroundColor: COLORS.lightGray, paddingVertical: 12, borderRadius: 10, flex: 1,  }}>
            <Text style={[TYPOGRAPHY.body.normal.semiBold, { textAlign: "center" }]}>Pomme</Text>
          </View>
        </View>
      </View>
      <View style={{ borderBottomWidth: 3, borderColor: COLORS.lightGray, paddingHorizontal: 16 }}>
        <View style={{ marginBlock: 20, gap: 8 }}>
          <Text style={[TYPOGRAPHY.heading.small.bold]}>Instructions</Text>
          <Text
          style={[
            TYPOGRAPHY.body.large.base,
            { color: COLORS.subtuleDark, lineHeight: 21 },
          ]}
        >
          Un mot à ajouter sur votre commande ?
        </Text>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder={"Ajouter des instructions"}
          placeholderTextColor={COLORS.subtuleDark}
          returnKeyLabel="done"
          returnKeyType="done"
          multiline
          numberOfLines={20}
          onChangeText={() => {}}
        ></TextInput>
        <View style={{ marginBottom: 44, marginTop: 32, flexDirection: "row", alignItems: "center", gap: 32}}>
          <Counter></Counter>
          <Button onPress={() => addToCart()} style={{ flex: 1, width: "auto" }}>
            Ajouter au panier
          </Button>
        </View>
      </View>

      <Text 
        style={{
          marginVertical: SPACING["xl"], 
          marginHorizontal: SPACING["md"], 
          ...TYPOGRAPHY.heading.small.bold
        }}>
          Tendances actuelles
        </Text>
      

    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EDF1F3",
    paddingHorizontal: 16,
    paddingVertical: 12,
    boxShadow: "0px 1px 2px 0px rgba(228, 229, 231, 0.24)",
    color: "#000000",
    height: 160,
  },
  cafeBackgroundImage: {
    width: "100%",  // Fill width
    height: 250,    // Fixed height, adjust as needed
    borderBottomLeftRadius: SPACING["7xl"],
    borderBottomRightRadius: SPACING["7xl"],
    borderTopLeftRadius: SPACING["7xl"],
    borderTopRightRadius: SPACING["7xl"],
  },
  cafeHeaderButtons: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 100,
    paddingHorizontal: 16,
    marginTop: SPACING["9xl"],
  },
  cafeHeaderButtonsRight: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  cafeHeaderIconButtons: {
    backgroundColor: "white",
  },
  cafeHeaderOpenStatus: {
    position: "absolute",
    paddingHorizontal: 16,
    bottom: 0,
    marginBottom: 26,
    alignSelf: "center",
  },
  cafeName: {
    marginHorizontal: SPACING["md"],
    marginTop: SPACING["2xl"],
    textAlign: "center",
  },
  cafeDescription: {
    marginHorizontal: SPACING["md"],
    lineHeight: 21,
    marginTop: SPACING["xs"],
    textAlign: "center",
  },
});
