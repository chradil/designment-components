//from: https://www.webstoemp.com/blog/headless-cms-graphql-api-eleventy/

//https://www.11ty.dev/docs/plugins/fetch/

// required packages
const fetch = require("node-fetch");

// DatoCMS token
const token = process.env.JWT_TOKEN;


async function getData() {

  // do we make a query ?
  let makeNewQuery = true;

  // Blogposts array
  let data = [];

  // make queries until makeNewQuery is set to false
  while (makeNewQuery) {
    try {
      // initiate fetch
      const data = await fetch("https://zinecatdev2.buzznon.com/admin/service/Item", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `getRelationships(
            table:"ca_collections",
            identifier:"Denver Zine Library",
            target:"ca_objects",
            bundles:[
            "ca_objects.preferred_labels.name"
            ]
            ){
            id,
            table,
            idno,
            relationships {
            id,
            table,
            relationship_typename,
            relationship_typecode,
            bundles {
            name,
            code,
            dataType,
            values {
            id,
            value_id,
            locale,
            value,
            }
            }
            }
            }`,
        }),
      });
   }
      // store the JSON response when promise resolves
      const response = await data.json();

      // handle DatoCMS errors
      if (response.errors) {
        let errors = response.errors;
        errors.map((error) => {
          console.log(error.message);
        });
        throw new Error("Aborting: errors");
      }
