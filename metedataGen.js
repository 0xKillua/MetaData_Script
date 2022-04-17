const fs = require("fs");
const datafile = require("./data.js");

//push data to an empty array
let metadata = [];
let metadataObject = {};
let attributes = [
  "Background",
  "Special Effect",
  "Back Accessory",
  "Skin",
  "Mouth",
  "Eyes",
  "Eyebrow",
  "Eye Accessory",
  "Hair Style",
  "Clothes",
  "Outer",
  "Head Accessory",
];

let counter = 0;
let dummy = "";
let attributesArray = [];
let attributesObject = {};
metadata = datafile.text.split("\n");

let legendary = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 55, 73, 89, 102, 123, 130, 156, 170, 199, 206, 221,
  243, 277, 283, 302, 313, 331, 356, 385, 423, 444, 468, 492, 505, 547, 559,
  571, 599, 605, 633, 678, 690, 723, 755, 798, 805, 826, 844, 858, 878,
];

for (let totalMetadata = 415; totalMetadata < 416; totalMetadata++) {
  fs.openSync(`./dollIsland_unrevealed/genesisPass`, "w");
  metadataObject["name"] = `Doll ${totalMetadata}`;
  if (legendary.includes(totalMetadata)) {
    metadataObject[
      "image"
    ] = `https://gateway.pinata.cloud/ipfs/QmeCJtmgf7vh5daQAji6ZifyQ4r5fmKcr2DYJ51m2oEQSp`;
  } else {
    metadataObject[
      "image"
    ] = `https://gateway.pinata.cloud/ipfs/QmeCJtmgf7vh5daQAji6ZifyQ4r5fmKcr2DYJ51m2oEQSp`;
  }

  for (let i = 0; i < metadata[totalMetadata].length; i++) {
    if (metadata[totalMetadata][i] == ".") {
      if (legendary.includes(totalMetadata)) {
        attributesObject["trait_type"] = "Legendary";
        attributesObject["value"] = dummy;
        attributesArray.push(attributesObject);
        attributesObject = {};
        dummy = "";
      } else {
        attributesObject["trait_type"] = attributes[counter];
        attributesObject["value"] = dummy;
        attributesArray.push(attributesObject);
        attributesObject = {};
        dummy = "";
        counter++;
      }
      if (i + 1 == metadata[totalMetadata].length) {
        metadataObject["attributes"] = attributesArray;
        fs.writeFile(
          `./dollIsland_406Metadata/${totalMetadata}`,
          JSON.stringify(metadataObject),
          function (err) {
            if (err) console.log(err);
          }
        );
        metadataObject = {};
        attributesArray = [];
        counter = 0;
        break;
      }
      continue;
    }
    dummy += metadata[totalMetadata][i];
  }
}
