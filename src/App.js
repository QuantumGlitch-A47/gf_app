import { useState, useMemo } from "react";

const BRAND_STYLES = {
  Juvela:     { bg:"#822861", light:"#f5e8f0", text:"#fff", abbr:"JU", url:"https://www.juvela.co.uk/gluten-free-products/" },
  Glutafin:   { bg:"#00529b", light:"#e6f0f8", text:"#fff", abbr:"GL", url:"https://www.glutafin.co.uk/products/" },
  Genius:     { bg:"#e84c0e", light:"#fdeee8", text:"#fff", abbr:"GN", url:"https://geniusglutenfree.com/en_gb/our-range/bread-rolls" },
  Warburtons: { bg:"#f5a800", light:"#fff8e6", text:"#fff", abbr:"WB", url:"https://www.warburtons.co.uk/products/gluten-wheat-and-milk-free/" },
  Barkat:     { bg:"#2e7d32", light:"#e8f5e9", text:"#fff", abbr:"BK", url:"https://glutenfree-foods.co.uk/collections/all" },
  Pure:       { bg:"#5c6bc0", light:"#ede7f6", text:"#fff", abbr:"PU", url:"https://glutenfree-foods.co.uk/collections/flours" },
  Tritamyl:   { bg:"#37474f", light:"#eceff1", text:"#fff", abbr:"TR", url:"https://glutenfree-foods.co.uk/collections/flours" },
  Just:       { bg:"#00897b", light:"#e0f2f1", text:"#fff", abbr:"JS", url:"https://glutenfree-foods.co.uk/collections/bread" },
};

const PRODUCT_LINKS = {
  1:"https://glutenfree-foods.co.uk/products/gluten-free-wholemeal-sliced-bread",
  2:"https://geniusglutenfree.com/en_gb/products/soft-brown-sandwich-loaf",
  3:"https://geniusglutenfree.com/en_gb/products/soft-white-sandwich-loaf",
  4:"https://geniusglutenfree.com/en_gb/our-range/bread-rolls",
  5:"https://www.glutafin.co.uk/products/bread/glutafin-gluten-free-baguettes/",
  6:"https://www.glutafin.co.uk/products/bread/glutafin-select-fibre-loaf/",
  7:"https://www.glutafin.co.uk/products/bread/glutafin-select-white-loaf/",
  8:"https://www.glutafin.co.uk/products/bread/",
  9:"https://www.glutafin.co.uk/products/bread/",
  10:"https://www.glutafin.co.uk/products/bread/",
  11:"https://www.glutafin.co.uk/products/bread/",
  14:"https://www.juvela.co.uk/gluten-free-products/fibre-sliced-loaf/",
  15:"https://www.juvela.co.uk/gluten-free-products/fibre-unsliced-loaf/",
  16:"https://www.juvela.co.uk/gluten-free-products/white-sliced-loaf/",
  17:"https://www.juvela.co.uk/gluten-free-products/white-unsliced-loaf/",
  18:"https://www.juvela.co.uk/gluten-free-products/part-baked-fibre-loaf/",
  19:"https://www.juvela.co.uk/gluten-free-products/part-baked-white-loaf/",
  20:"https://www.juvela.co.uk/gluten-free-products/fibre-rolls/",
  21:"https://www.juvela.co.uk/gluten-free-products/fresh-fibre-loaf/",
  22:"https://www.juvela.co.uk/gluten-free-products/fresh-white-loaf/",
  23:"https://www.juvela.co.uk/gluten-free-products/fresh-white-rolls/",
  24:"https://www.juvela.co.uk/gluten-free-products/fresh-fibre-rolls/",
  25:"https://www.juvela.co.uk/gluten-free-products/part-baked-fibre-rolls/",
  26:"https://www.juvela.co.uk/gluten-free-products/part-baked-white-rolls/",
  27:"https://www.juvela.co.uk/gluten-free-products/white-rolls/",
  34:"https://www.warburtons.co.uk/products/gluten-wheat-and-milk-free/bread/",
  35:"https://www.warburtons.co.uk/products/gluten-wheat-and-milk-free/bread/",
  36:"https://www.warburtons.co.uk/products/gluten-wheat-and-milk-free/4-white-rolls-gf/",
  37:"https://www.warburtons.co.uk/products/gluten-wheat-and-milk-free/rolls/",
  38:"https://glutenfree-foods.co.uk/collections/flours",
  39:"https://glutenfree-foods.co.uk/collections/flours",
  40:"https://www.glutafin.co.uk/products/flour-mixes/glutafin-gluten-free-bread-mix/",
  41:"https://www.glutafin.co.uk/products/flour-mixes/",
  42:"https://www.glutafin.co.uk/products/flour-mixes/gluten-free-select-multipurpose-white-mix/",
  43:"https://www.glutafin.co.uk/products/flour-mixes/gluten-free-select-multipurpose-fibre-mix/",
  44:"https://www.glutafin.co.uk/products/flour-mixes/glutafin-gluten-free-select-bread-mix/",
  45:"https://www.glutafin.co.uk/products/flour-mixes/",
  46:"https://www.glutafin.co.uk/products/flour-mixes/gluten-free-select-multipurpose-fibre-mix/",
  47:"https://www.glutafin.co.uk/products/flour-mixes/gluten-free-select-multipurpose-white-mix/",
  48:"https://www.juvela.co.uk/gluten-free-products/gluten-free-flour-mixes/",
  49:"https://www.juvela.co.uk/gluten-free-products/gluten-free-flour-mixes/",
  50:"https://www.juvela.co.uk/gluten-free-products/gluten-free-flour-mixes/",
  61:"https://www.glutafin.co.uk/products/pizza-bases/glutafin-gluten-free-pizza-bases/",
  62:"https://glutenfree-foods.co.uk/products/gluten-free-buckwheat-pasta-penne",
  63:"https://glutenfree-foods.co.uk/products/gluten-free-buckwheat-pasta-spirals",
  64:"https://www.glutafin.co.uk/products/pasta/",
  65:"https://www.glutafin.co.uk/products/pasta/",
  66:"https://www.glutafin.co.uk/products/pasta/",
  67:"https://www.juvela.co.uk/gluten-free-products/gluten-free-pasta/",
  68:"https://www.juvela.co.uk/gluten-free-products/gluten-free-pasta/",
  69:"https://www.juvela.co.uk/gluten-free-products/gluten-free-pasta/",
  70:"https://www.juvela.co.uk/gluten-free-products/gluten-free-pasta/",
  71:"https://www.juvela.co.uk/gluten-free-products/gluten-free-pasta/",
  72:"https://www.juvela.co.uk/gluten-free-products/gluten-free-pasta/",
  73:"https://www.glutafin.co.uk/products/crackers/glutafin-gluten-free-crackers/",
  74:"https://www.glutafin.co.uk/products/crackers/glutafin-gluten-free-mini-crackers/",
  75:"https://www.juvela.co.uk/gluten-free-products/",
  76:"https://glutenfree-foods.co.uk/collections/all",
  77:"https://www.glutafin.co.uk/products/breakfast-cereals/glutafin-gluten-free-cornflakes/",
  78:"https://www.juvela.co.uk/gluten-free-products/gluten-free-oats-and-cereal/",
  79:"https://www.juvela.co.uk/gluten-free-products/gluten-free-oats-and-cereal/",
  80:"https://www.juvela.co.uk/gluten-free-products/gluten-free-oats-and-cereal/",
  81:"https://www.juvela.co.uk/gluten-free-products/gluten-free-oats-and-cereal/",
};

const PRODUCTS = [
  {id:1,  category:"Bread & Rolls",         brand:"Barkat",     name:"Wholemeal Sliced Bread 500g",                                  pip:"339-4889", units:1},
  {id:2,  category:"Bread & Rolls",         brand:"Genius",     name:"Brown Sandwich Bread Sliced 535g (x6)",                       pip:"379-8550", units:6},
  {id:3,  category:"Bread & Rolls",         brand:"Genius",     name:"White Sandwich Bread Sliced 535g (x6)",                       pip:"379-8568", units:6},
  {id:4,  category:"Bread & Rolls",         brand:"Genius",     name:"Brown Seeded Farmhouse Loaf Sliced 535g (x6)",                pip:"403-8345", units:6},
  {id:5,  category:"Bread & Rolls",         brand:"Glutafin",   name:"Baguettes 350g (2 x 175g)",                                   pip:"224-0117", units:1},
  {id:6,  category:"Bread & Rolls",         brand:"Glutafin",   name:"Select Fibre Loaf Sliced 400g",                               pip:"054-6101", units:1},
  {id:7,  category:"Bread & Rolls",         brand:"Glutafin",   name:"Select White Loaf Sliced 400g",                               pip:"054-6093", units:1},
  {id:8,  category:"Bread & Rolls",         brand:"Glutafin",   name:"Select Seeded Loaf Sliced 400g",                              pip:"308-9364", units:1},
  {id:9,  category:"Bread & Rolls",         brand:"Glutafin",   name:"Select Fresh Seeded Loaf Sliced 400g (x8)",                   pip:"402-3685", units:8},
  {id:10, category:"Bread & Rolls",         brand:"Glutafin",   name:"Select Fresh Brown Loaf Sliced 400g (x8)",                    pip:"330-6800", units:8},
  {id:11, category:"Bread & Rolls",         brand:"Glutafin",   name:"Select Fresh White Loaf Sliced 400g (x8)",                    pip:"290-6840", units:8},
  {id:12, category:"Bread & Rolls",         brand:"Just",       name:"White Sandwich Bread 600g x 6",                               pip:"845-3813", units:9},
  {id:13, category:"Bread & Rolls",         brand:"Just",       name:"Good White Rolls 260g (4x65g) x 6",                           pip:"845-3839", units:6},
  {id:14, category:"Bread & Rolls",         brand:"Juvela",     name:"Fibre Loaf Sliced 400g",                                      pip:"074-8632", units:1},
  {id:15, category:"Bread & Rolls",         brand:"Juvela",     name:"Fibre Loaf Unsliced 400g",                                    pip:"010-1675", units:1},
  {id:16, category:"Bread & Rolls",         brand:"Juvela",     name:"White Loaf Sliced 400g",                                      pip:"074-8590", units:1},
  {id:17, category:"Bread & Rolls",         brand:"Juvela",     name:"White Loaf Unsliced 400g",                                    pip:"031-4781", units:1},
  {id:18, category:"Bread & Rolls",         brand:"Juvela",     name:"Part-baked Fibre Loaf Unsliced 400g",                         pip:"273-6890", units:1},
  {id:19, category:"Bread & Rolls",         brand:"Juvela",     name:"Part-baked White Loaf Unsliced 400g",                         pip:"273-6882", units:1},
  {id:20, category:"Bread & Rolls",         brand:"Juvela",     name:"Fibre Bread Rolls (5 pack) 425g",                             pip:"080-3668", units:1},
  {id:21, category:"Bread & Rolls",         brand:"Juvela",     name:"Fresh Baked Fibre Loaf Sliced 400g x 8",                      pip:"339-9789", units:8},
  {id:22, category:"Bread & Rolls",         brand:"Juvela",     name:"Fresh Baked White Loaf Sliced 400g x 8",                      pip:"322-0217", units:8},
  {id:23, category:"Bread & Rolls",         brand:"Juvela",     name:"Fresh White Rolls (5 pack) 425g x 8",                         pip:"355-8871", units:8},
  {id:24, category:"Bread & Rolls",         brand:"Juvela",     name:"Fresh Fibre Rolls (5 pack) 425g x 8",                         pip:"355-6800", units:8},
  {id:25, category:"Bread & Rolls",         brand:"Juvela",     name:"Part-baked Fibre Rolls 375g",                                 pip:"262-9020", units:1},
  {id:26, category:"Bread & Rolls",         brand:"Juvela",     name:"Part-baked White Rolls 375g",                                 pip:"243-7267", units:1},
  {id:27, category:"Bread & Rolls",         brand:"Juvela",     name:"White Bread Rolls (5 pack) 425g",                             pip:"010-5916", units:1},
  {id:28, category:"Bread & Rolls",         brand:"Juvela",     name:"Mixed Case Fresh White (rolls + loaves)",                     pip:"836-4259", units:8},
  {id:29, category:"Bread & Rolls",         brand:"Juvela",     name:"Mixed Case Fresh Fibre (rolls + loaves)",                     pip:"836-4242", units:8},
  {id:30, category:"Bread & Rolls",         brand:"Juvela",     name:"Mixed Case Fresh Loaves (fibre + white)",                     pip:"839-2821", units:8},
  {id:31, category:"Bread & Rolls",         brand:"Juvela",     name:"Mixed Case Fresh Rolls (fibre + white)",                      pip:"839-2839", units:8},
  {id:32, category:"Bread & Rolls",         brand:"Juvela",     name:"Mixed Case Fresh Loaves & Rolls (fibre rolls+white loaves)",  pip:"839-2847", units:8},
  {id:33, category:"Bread & Rolls",         brand:"Juvela",     name:"Mixed Case Fresh Loaves & Rolls (white rolls+fibre loaves)",  pip:"839-2730", units:8},
  {id:34, category:"Bread & Rolls",         brand:"Warburtons", name:"Brown Bread Sliced 400g (x4)",                                pip:"368-5278", units:4},
  {id:35, category:"Bread & Rolls",         brand:"Warburtons", name:"White Bread Sliced 400g (x4)",                                pip:"368-5260", units:4},
  {id:36, category:"Bread & Rolls",         brand:"Warburtons", name:"White Rolls 232g (4 rolls per pack) x 4",                     pip:"368-5286", units:2},
  {id:37, category:"Bread & Rolls",         brand:"Warburtons", name:"Brown Rolls 232g (4 rolls per pack) x 4",                     pip:"368-5294", units:2},
  {id:38, category:"Home Baking",           brand:"Barkat",     name:"Bread Mix 500g",                                              pip:"051-5338", units:2},
  {id:39, category:"Home Baking",           brand:"Barkat",     name:"All Purpose Flour Mix 500g",                                  pip:"399-2377", units:2},
  {id:40, category:"Home Baking",           brand:"Glutafin",   name:"Bread Mix 500g",                                              pip:"298-8418", units:2},
  {id:41, category:"Home Baking",           brand:"Glutafin",   name:"Fibre Bread Mix 500g",                                        pip:"298-8426", units:2},
  {id:42, category:"Home Baking",           brand:"Glutafin",   name:"Multipurpose White Mix 500g",                                 pip:"231-2981", units:2},
  {id:43, category:"Home Baking",           brand:"Glutafin",   name:"Multipurpose Fibre Mix 500g",                                 pip:"231-2973", units:2},
  {id:44, category:"Home Baking",           brand:"Glutafin",   name:"Select Bread Mix 500g",                                       pip:"274-4951", units:2},
  {id:45, category:"Home Baking",           brand:"Glutafin",   name:"Select Fibre Bread Mix 500g",                                 pip:"297-9912", units:2},
  {id:46, category:"Home Baking",           brand:"Glutafin",   name:"Select Multipurpose Fibre Mix 500g",                          pip:"004-5591", units:2},
  {id:47, category:"Home Baking",           brand:"Glutafin",   name:"Select Multipurpose White Mix 500g",                          pip:"004-5187", units:2},
  {id:48, category:"Home Baking",           brand:"Juvela",     name:"Fibre Mix 500g",                                              pip:"023-6042", units:2},
  {id:49, category:"Home Baking",           brand:"Juvela",     name:"Harvest Mix 500g",                                            pip:"247-7875", units:2},
  {id:50, category:"Home Baking",           brand:"Juvela",     name:"White Mix 500g",                                              pip:"035-2161", units:2},
  {id:51, category:"Home Baking",           brand:"Pure",       name:"Bakery Blend 1kg",                                            pip:"282-8580", units:4},
  {id:52, category:"Home Baking",           brand:"Pure",       name:"White Rice Flour 500g",                                       pip:"325-7904", units:2},
  {id:53, category:"Home Baking",           brand:"Pure",       name:"Brown Rice Flour 500g",                                       pip:"325-7912", units:2},
  {id:54, category:"Home Baking",           brand:"Pure",       name:"Potato Starch Flour 500g",                                    pip:"325-7920", units:2},
  {id:55, category:"Home Baking",           brand:"Pure",       name:"Tapioca Starch Flour 500g",                                   pip:"325-7946", units:2},
  {id:56, category:"Home Baking",           brand:"Pure",       name:"White Teff Flour 1kg",                                        pip:"343-1483", units:4},
  {id:57, category:"Home Baking",           brand:"Pure",       name:"Brown Teff Flour 1kg",                                        pip:"343-1467", units:4},
  {id:58, category:"Home Baking",           brand:"Tritamyl",   name:"Self Raising Flour Mix 2kg",                                  pip:"228-0675", units:8},
  {id:59, category:"Home Baking",           brand:"Tritamyl",   name:"White Bread Mix 2kg",                                         pip:"228-0667", units:8},
  {id:60, category:"Home Baking",           brand:"Tritamyl",   name:"Brown Bread Mix 1kg",                                         pip:"228-0659", units:4},
  {id:61, category:"Pizza Bases",           brand:"Glutafin",   name:"Pizza Bases 300g (2 x 150g)",                                 pip:"334-1112", units:1},
  {id:62, category:"Pasta",                 brand:"Barkat",     name:"Buckwheat Pasta Penne 250g",                                  pip:"232-3319", units:1},
  {id:63, category:"Pasta",                 brand:"Barkat",     name:"Buckwheat Pasta Spirals 250g",                                pip:"232-2873", units:1},
  {id:64, category:"Pasta",                 brand:"Glutafin",   name:"Spirals 500g",                                                pip:"211-5178", units:2},
  {id:65, category:"Pasta",                 brand:"Glutafin",   name:"Penne 500g",                                                  pip:"211-5152", units:2},
  {id:66, category:"Pasta",                 brand:"Glutafin",   name:"Long Cut Spaghetti 500g",                                     pip:"211-5160", units:2},
  {id:67, category:"Pasta",                 brand:"Juvela",     name:"Fibre Penne 500g",                                            pip:"332-8010", units:2},
  {id:68, category:"Pasta",                 brand:"Juvela",     name:"Fusilli 500g",                                                pip:"280-7980", units:2},
  {id:69, category:"Pasta",                 brand:"Juvela",     name:"Macaroni 500g",                                               pip:"280-8004", units:2},
  {id:70, category:"Pasta",                 brand:"Juvela",     name:"Spaghetti 500g",                                              pip:"280-7998", units:2},
  {id:71, category:"Pasta",                 brand:"Juvela",     name:"Tagliatelle 250g",                                            pip:"319-3497", units:1},
  {id:72, category:"Pasta",                 brand:"Juvela",     name:"Lasagne 250g",                                                pip:"280-7972", units:1},
  {id:73, category:"Crackers & Crispbread", brand:"Glutafin",   name:"Crackers 200g",                                               pip:"009-3302", units:1},
  {id:74, category:"Crackers & Crispbread", brand:"Glutafin",   name:"Mini Crackers 175g",                                          pip:"353-5515", units:0.5},
  {id:75, category:"Crackers & Crispbread", brand:"Juvela",     name:"Crispbread 200g",                                             pip:"236-6136", units:1},
  {id:76, category:"Baking Aids",           brand:"Barkat",     name:"Xanthan Gum 80g",                                             pip:"400-8074", units:0.5},
  {id:77, category:"Breakfast Cereal",      brand:"Glutafin",   name:"Cornflakes 375g",                                             pip:"381-3748", units:1.5},
  {id:78, category:"Breakfast Cereal",      brand:"Juvela",     name:"Flakes 300g",                                                 pip:"371-1652", units:1.5},
  {id:79, category:"Breakfast Cereal",      brand:"Juvela",     name:"Fibre Flakes 300g",                                           pip:"371-1660", units:1.5},
  {id:80, category:"Breakfast Cereal",      brand:"Juvela",     name:"Crispy Rice 375g",                                            pip:"388-2982", units:1.5},
  {id:81, category:"Breakfast Cereal",      brand:"Juvela",     name:"Pure Oats 500g",                                              pip:"371-1678", units:1.5},
];

const ALLOWANCES = [
  {label:"Child 1–3 years",    units:10},
  {label:"Child 4–6 years",    units:11},
  {label:"Child 7–10 years",   units:13},
  {label:"Child 11–14 years",  units:15},
  {label:"Child 15–18 years",  units:18},
  {label:"Male 19–59 years",   units:18},
  {label:"Male 60–74 years",   units:16},
  {label:"Male 75+ years",     units:14},
  {label:"Female 19–74 years", units:14},
  {label:"Female 75+ years",   units:12},
];

const DEMO_PATIENTS = [
  {id:"P001", name:"Sarah Mitchell",  dob:"1985-03-12", allowanceLabel:"Female 19–74 years", allowance:14, breastfeeding:false, pregnancy3rd:false, pharmacy:"Boots, Buchanan St, Glasgow", address:"12 Oak Lane, Glasgow", tel:"07712 345678"},
  {id:"P002", name:"James Henderson", dob:"1952-07-28", allowanceLabel:"Male 60–74 years",   allowance:16, breastfeeding:false, pregnancy3rd:false, pharmacy:"Boots, Buchanan St, Glasgow", address:"45 Elm Road, Glasgow",  tel:"07823 456789"},
  {id:"P003", name:"Lily Thomson",    dob:"2018-11-04", allowanceLabel:"Child 4–6 years",    allowance:11, breastfeeding:false, pregnancy3rd:false, pharmacy:"Boots, Buchanan St, Glasgow", address:"8 Maple Ave, Glasgow",   tel:"07934 567890"},
];

const CATEGORIES = ["All","Bread & Rolls","Home Baking","Pizza Bases","Pasta","Crackers & Crispbread","Baking Aids","Breakfast Cereal"];
const CAT_ICONS  = {"All":"📋","Bread & Rolls":"🍞","Home Baking":"🧁","Pizza Bases":"🍕","Pasta":"🍝","Crackers & Crispbread":"🫓","Baking Aids":"🥄","Breakfast Cereal":"🥣"};

const NHS_BLUE="#005EB8", NHS_DARK="#003087", NHS_GREEN="#009639", NHS_WARM="#F0F4F5", NHS_RED="#AE2573";

const labelStyle = {display:"block",fontSize:14,fontWeight:700,color:"#1d2a32",marginBottom:4,marginTop:14};
const inputStyle = {width:"100%",boxSizing:"border-box",border:"2px solid #aeb7bd",borderRadius:4,padding:"10px 12px",fontSize:14,outline:"none",background:"#fff"};
const btnPrimary = {display:"block",width:"100%",background:NHS_BLUE,color:"#fff",border:"none",borderRadius:4,padding:"12px 0",fontWeight:700,fontSize:15,cursor:"pointer",marginTop:16};
const qtyBtn    = {width:32,height:32,borderRadius:4,border:"1px solid #bfc8cd",background:"#f0f4f5",cursor:"pointer",fontWeight:700,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"};

function NHSHeader({mode, setMode}) {
  return (
    <div style={{background:mode==="pharmacist"?"#003087":NHS_BLUE, padding:"14px 24px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
      <div style={{display:"flex", alignItems:"center", gap:12}}>
        <div style={{background:"#fff",borderRadius:4,padding:"4px 10px",fontWeight:900,fontSize:18,color:mode==="pharmacist"?"#003087":NHS_BLUE,letterSpacing:1}}>NHS</div>
        <span style={{color:"#fff",fontWeight:700,fontSize:16}}>
          Gluten-Free Food Prescription
          {mode==="pharmacist" && <span style={{marginLeft:10,background:"rgba(255,255,255,0.2)",borderRadius:4,padding:"2px 10px",fontSize:13}}>Pharmacist View</span>}
        </span>
      </div>
      <button onClick={() => setMode(mode==="patient"?"pharmacist":"patient")}
        style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.4)",color:"#fff",borderRadius:4,padding:"6px 14px",cursor:"pointer",fontSize:13,fontWeight:600}}>
        {mode==="patient" ? "🔬 Switch to Pharmacist" : "👤 Switch to Patient"}
      </button>
    </div>
  );
}

function NavBar({screen, setScreen, orderCount}) {
  return (
    <div style={{background:"#fff",borderBottom:"1px solid #d8dde0"}}>
      <div style={{maxWidth:900,margin:"0 auto",display:"flex"}}>
        {["Browse","My Order","History"].map(t => {
          const s = t==="Browse"?"browse":t==="My Order"?"order":"history";
          const active = screen===s;
          return (
            <button key={t} onClick={()=>setScreen(s)}
              style={{background:"none",border:"none",padding:"14px 20px",cursor:"pointer",fontWeight:600,fontSize:14,
                color:active?NHS_BLUE:"#425563",borderBottom:active?`3px solid ${NHS_BLUE}`:"3px solid transparent"}}>
              {t}{t==="My Order"&&orderCount>0?` (${orderCount})`:""}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function UnitBar({used, allowance}) {
  const pct = allowance>0?Math.min((used/allowance)*100,100):0;
  const barColor = pct>=100?NHS_RED:pct>=80?"#ED8B00":NHS_GREEN;
  return (
    <div style={{background:NHS_DARK,color:"#fff",padding:"12px 20px"}}>
      <div style={{maxWidth:900,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
          <span style={{fontSize:14}}>Monthly Units: <strong>{used} of {allowance} used</strong></span>
          <span style={{fontSize:14}}>{allowance-used>=0?`${allowance-used} remaining`:"Over limit!"}</span>
        </div>
        <div style={{background:"rgba(255,255,255,0.2)",borderRadius:4,height:8}}>
          <div style={{width:`${pct}%`,background:barColor,borderRadius:4,height:8,transition:"width 0.3s"}}/>
        </div>
      </div>
    </div>
  );
}

function BrandCard({brand, size=56}) {
  const bs = BRAND_STYLES[brand]||{bg:"#607d8b",text:"#fff",abbr:"??"};
  return (
    <div style={{width:size,height:size,borderRadius:8,background:bs.bg,display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 1px 4px rgba(0,0,0,0.15)"}}>
      <span style={{color:bs.text,fontWeight:900,fontSize:size*0.28,letterSpacing:1,lineHeight:1}}>{bs.abbr}</span>
      <span style={{color:bs.text,fontSize:size*0.13,opacity:0.85,marginTop:2,fontWeight:600}}>{brand}</span>
    </div>
  );
}

// ─── PHARMACIST VIEW ───────────────────────────────────────────────────────────
function PharmacistView({allOrders, setAllOrders, patients, setPatients, setMode}) {
  const [pharmaScreen, setPharmaScreen] = useState("orders"); // orders | patients | patientDetail
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editingAllowance, setEditingAllowance] = useState(null);
  const [newAllowance, setNewAllowance] = useState("");
  const [editingLabel, setEditingLabel] = useState("");

  const pendingOrders = allOrders.filter(o=>o.status==="Submitted");
  const dispensedOrders = allOrders.filter(o=>o.status==="Dispensed");

  function markDispensed(orderId) {
    setAllOrders(prev=>prev.map(o=>o.id===orderId?{...o,status:"Dispensed"}:o));
  }

  function saveAllowance(patientId) {
    const val = parseFloat(newAllowance);
    if (isNaN(val)||val<1) return;
    setPatients(prev=>prev.map(p=>p.id===patientId?{...p,allowance:val,allowanceLabel:editingLabel||p.allowanceLabel}:p));
    setEditingAllowance(null);
    setNewAllowance("");
  }

  const patientOrders = selectedPatient ? allOrders.filter(o=>o.patientId===selectedPatient.id) : [];

  return (
    <div style={{minHeight:"100vh",background:NHS_WARM,fontFamily:"Arial, sans-serif"}}>
      <NHSHeader mode="pharmacist" setMode={setMode}/>

      {/* Pharmacist Nav */}
      <div style={{background:"#fff",borderBottom:"1px solid #d8dde0"}}>
        <div style={{maxWidth:1000,margin:"0 auto",display:"flex"}}>
          {[["orders","📋 Orders"],["patients","👥 Patients"]].map(([s,label])=>(
            <button key={s} onClick={()=>{setPharmaScreen(s);setSelectedPatient(null);}}
              style={{background:"none",border:"none",padding:"14px 22px",cursor:"pointer",fontWeight:600,fontSize:14,
                color:pharmaScreen===s&&!selectedPatient?NHS_BLUE:"#425563",
                borderBottom:pharmaScreen===s&&!selectedPatient?`3px solid ${NHS_BLUE}`:"3px solid transparent"}}>
              {label}
            </button>
          ))}
          {selectedPatient && (
            <button style={{background:"none",border:"none",padding:"14px 22px",cursor:"pointer",fontWeight:600,fontSize:14,
              color:NHS_BLUE,borderBottom:`3px solid ${NHS_BLUE}`}}>
              👤 {selectedPatient.name}
            </button>
          )}
        </div>
      </div>

      <div style={{maxWidth:1000,margin:"24px auto",padding:"0 16px"}}>

        {/* ORDERS SCREEN */}
        {pharmaScreen==="orders" && !selectedPatient && (
          <>
            {/* Stats row */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:24}}>
              {[
                {label:"Pending Orders",  val:pendingOrders.length,  color:NHS_BLUE},
                {label:"Dispensed Today", val:dispensedOrders.length, color:NHS_GREEN},
                {label:"Total Patients",  val:patients.length,        color:"#37474f"},
              ].map(s=>(
                <div key={s.label} style={{background:"#fff",borderRadius:8,padding:20,textAlign:"center",boxShadow:"0 1px 4px rgba(0,0,0,0.07)",borderTop:`4px solid ${s.color}`}}>
                  <div style={{fontSize:32,fontWeight:900,color:s.color}}>{s.val}</div>
                  <div style={{fontSize:13,color:"#425563",marginTop:4}}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Pending orders */}
            <h3 style={{color:NHS_DARK,margin:"0 0 12px"}}>Pending Orders</h3>
            {pendingOrders.length===0?(
              <div style={{background:"#fff",borderRadius:8,padding:24,textAlign:"center",color:"#768692",marginBottom:20}}>
                No pending orders.
              </div>
            ):pendingOrders.map(order=>{
              const pt = patients.find(p=>p.id===order.patientId)||{name:"Unknown"};
              return (
                <div key={order.id} style={{background:"#fff",borderRadius:8,padding:20,marginBottom:12,boxShadow:"0 1px 4px rgba(0,0,0,0.07)",borderLeft:`4px solid ${NHS_BLUE}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                    <div>
                      <span style={{fontWeight:700,color:NHS_DARK,fontSize:15}}>{pt.name}</span>
                      <span style={{marginLeft:12,fontSize:13,color:"#768692"}}>{order.date}</span>
                      <span style={{marginLeft:12,fontSize:12,background:"#e3f0fb",color:NHS_BLUE,padding:"2px 8px",borderRadius:10,fontWeight:600}}>{order.id}</span>
                    </div>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <span style={{fontSize:13,color:"#425563"}}>{order.totalUnits}/{order.allowance} units</span>
                      <button onClick={()=>markDispensed(order.id)}
                        style={{background:NHS_GREEN,color:"#fff",border:"none",borderRadius:4,padding:"7px 16px",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                        ✓ Mark Dispensed
                      </button>
                    </div>
                  </div>
                  <div style={{marginTop:12,borderTop:"1px solid #f0f4f5",paddingTop:10,display:"grid",gap:4}}>
                    {order.items.map((item,i)=>{
                      const bs=BRAND_STYLES[item.brand]||{bg:"#607d8b"};
                      return (
                        <div key={i} style={{display:"flex",alignItems:"center",gap:8,fontSize:13}}>
                          <div style={{width:8,height:8,borderRadius:2,background:bs.bg,flexShrink:0}}/>
                          <span style={{flex:1,color:"#1d2a32"}}>{item.brand} — {item.name} ×{item.qty}</span>
                          <span style={{fontSize:12,color:"#768692"}}>PIP: {item.pip}</span>
                          <span style={{fontWeight:700,color:NHS_DARK,minWidth:32,textAlign:"right"}}>{item.totalUnits}u</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Recent dispensed */}
            {dispensedOrders.length>0&&(
              <>
                <h3 style={{color:NHS_DARK,margin:"24px 0 12px"}}>Recently Dispensed</h3>
                {dispensedOrders.map(order=>{
                  const pt=patients.find(p=>p.id===order.patientId)||{name:"Unknown"};
                  return (
                    <div key={order.id} style={{background:"#fff",borderRadius:8,padding:16,marginBottom:10,boxShadow:"0 1px 4px rgba(0,0,0,0.05)",borderLeft:`4px solid ${NHS_GREEN}`,opacity:0.85}}>
                      <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
                        <div>
                          <span style={{fontWeight:600,color:"#1d2a32"}}>{pt.name}</span>
                          <span style={{marginLeft:10,fontSize:13,color:"#768692"}}>{order.date}</span>
                        </div>
                        <span style={{background:"#e8f5e9",color:NHS_GREEN,fontSize:12,fontWeight:700,padding:"3px 10px",borderRadius:12}}>✓ Dispensed</span>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </>
        )}

        {/* PATIENTS SCREEN */}
        {pharmaScreen==="patients" && !selectedPatient && (
          <>
            <h3 style={{color:NHS_DARK,margin:"0 0 16px"}}>Registered Patients</h3>
            {patients.map(pt=>{
              const ptOrders = allOrders.filter(o=>o.patientId===pt.id);
              const pending  = ptOrders.filter(o=>o.status==="Submitted").length;
              return (
                <div key={pt.id} style={{background:"#fff",borderRadius:8,padding:18,marginBottom:12,boxShadow:"0 1px 4px rgba(0,0,0,0.07)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:14}}>
                    <div style={{width:44,height:44,borderRadius:"50%",background:NHS_DARK,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:16,flexShrink:0}}>
                      {pt.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                    </div>
                    <div>
                      <p style={{margin:"0 0 2px",fontWeight:700,color:"#1d2a32",fontSize:15}}>{pt.name}</p>
                      <p style={{margin:0,fontSize:13,color:"#768692"}}>{pt.allowanceLabel} · {pt.allowance} units/month · {pt.pharmacy}</p>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    {pending>0&&<span style={{background:"#fff3e0",color:"#E65100",fontSize:12,fontWeight:700,padding:"3px 10px",borderRadius:10}}>{pending} pending</span>}
                    <span style={{fontSize:13,color:"#768692"}}>{ptOrders.length} order{ptOrders.length!==1?"s":""}</span>
                    <button onClick={()=>{setSelectedPatient(pt);setPharmaScreen("patients");}}
                      style={{background:NHS_BLUE,color:"#fff",border:"none",borderRadius:4,padding:"7px 16px",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                      View →
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* PATIENT DETAIL */}
        {selectedPatient && (
          <>
            <button onClick={()=>setSelectedPatient(null)}
              style={{background:"none",border:"none",color:NHS_BLUE,cursor:"pointer",fontWeight:700,fontSize:14,padding:"0 0 16px",display:"flex",alignItems:"center",gap:6}}>
              ← Back to Patients
            </button>

            {/* Patient card */}
            <div style={{background:"#fff",borderRadius:8,padding:20,marginBottom:20,boxShadow:"0 1px 4px rgba(0,0,0,0.07)",borderTop:`4px solid ${NHS_DARK}`}}>
              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
                <div>
                  <h3 style={{margin:"0 0 6px",color:NHS_DARK}}>{selectedPatient.name}</h3>
                  <p style={{margin:"0 0 2px",fontSize:14,color:"#425563"}}>📍 {selectedPatient.address}</p>
                  <p style={{margin:"0 0 2px",fontSize:14,color:"#425563"}}>📞 {selectedPatient.tel}</p>
                  <p style={{margin:0,fontSize:14,color:"#425563"}}>💊 Pharmacy: {selectedPatient.pharmacy}</p>
                </div>
                <div style={{background:NHS_WARM,borderRadius:8,padding:"12px 20px",textAlign:"center"}}>
                  <div style={{fontSize:28,fontWeight:900,color:NHS_DARK}}>{selectedPatient.allowance}</div>
                  <div style={{fontSize:12,color:"#425563"}}>units/month</div>
                  <div style={{fontSize:11,color:"#768692",marginTop:2}}>{selectedPatient.allowanceLabel}</div>
                </div>
              </div>

              {/* Adjust allowance */}
              <div style={{marginTop:16,borderTop:"1px solid #f0f4f5",paddingTop:14}}>
                {editingAllowance===selectedPatient.id?(
                  <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                    <select style={{...inputStyle,width:"auto",marginTop:0,flex:1}} value={editingLabel}
                      onChange={e=>{setEditingLabel(e.target.value);const a=ALLOWANCES.find(a=>a.label===e.target.value);if(a)setNewAllowance(String(a.units));}}>
                      <option value="">Select category…</option>
                      {ALLOWANCES.map(a=><option key={a.label} value={a.label}>{a.label} — {a.units}u</option>)}
                    </select>
                    <input style={{...inputStyle,width:80,marginTop:0}} type="number" value={newAllowance} placeholder="Units"
                      onChange={e=>setNewAllowance(e.target.value)}/>
                    <button onClick={()=>saveAllowance(selectedPatient.id)}
                      style={{background:NHS_GREEN,color:"#fff",border:"none",borderRadius:4,padding:"10px 16px",fontWeight:700,cursor:"pointer"}}>Save</button>
                    <button onClick={()=>setEditingAllowance(null)}
                      style={{background:"none",border:"1px solid #bfc8cd",borderRadius:4,padding:"10px 16px",cursor:"pointer",color:"#425563"}}>Cancel</button>
                  </div>
                ):(
                  <button onClick={()=>{setEditingAllowance(selectedPatient.id);setNewAllowance(String(selectedPatient.allowance));setEditingLabel(selectedPatient.allowanceLabel);}}
                    style={{background:"none",border:`1px solid ${NHS_BLUE}`,color:NHS_BLUE,borderRadius:4,padding:"8px 16px",fontWeight:700,fontSize:13,cursor:"pointer"}}>
                    ✏️ Adjust Unit Allowance
                  </button>
                )}
              </div>
            </div>

            {/* Patient order history */}
            <h3 style={{color:NHS_DARK,margin:"0 0 12px"}}>Order History ({patientOrders.length})</h3>
            {patientOrders.length===0?(
              <div style={{background:"#fff",borderRadius:8,padding:24,textAlign:"center",color:"#768692"}}>No orders yet.</div>
            ):patientOrders.map(order=>(
              <div key={order.id} style={{background:"#fff",borderRadius:8,padding:18,marginBottom:12,boxShadow:"0 1px 4px rgba(0,0,0,0.06)",borderLeft:`4px solid ${order.status==="Dispensed"?NHS_GREEN:NHS_BLUE}`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,flexWrap:"wrap",gap:8}}>
                  <div>
                    <span style={{fontWeight:700,color:NHS_DARK}}>{order.id}</span>
                    <span style={{marginLeft:10,fontSize:13,color:"#768692"}}>{order.date}</span>
                  </div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <span style={{fontSize:13,color:"#425563"}}>{order.totalUnits}/{order.allowance}u</span>
                    <span style={{background:order.status==="Dispensed"?"#e8f5e9":"#e3f0fb",
                      color:order.status==="Dispensed"?NHS_GREEN:NHS_BLUE,
                      fontSize:12,fontWeight:700,padding:"3px 10px",borderRadius:12}}>
                      {order.status==="Dispensed"?"✓ Dispensed":"⏳ Pending"}
                    </span>
                    {order.status==="Submitted"&&(
                      <button onClick={()=>markDispensed(order.id)}
                        style={{background:NHS_GREEN,color:"#fff",border:"none",borderRadius:4,padding:"5px 12px",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                        ✓ Dispense
                      </button>
                    )}
                  </div>
                </div>
                <div style={{borderTop:"1px solid #f0f4f5",paddingTop:8,display:"grid",gap:3}}>
                  {order.items.map((item,i)=>{
                    const bs=BRAND_STYLES[item.brand]||{bg:"#607d8b"};
                    return (
                      <div key={i} style={{display:"flex",alignItems:"center",gap:8,fontSize:13}}>
                        <div style={{width:8,height:8,borderRadius:2,background:bs.bg,flexShrink:0}}/>
                        <span style={{flex:1,color:"#1d2a32"}}>{item.brand} — {item.name} ×{item.qty}</span>
                        <span style={{fontSize:11,color:"#768692"}}>PIP: {item.pip}</span>
                        <span style={{fontWeight:700,color:NHS_DARK,minWidth:32,textAlign:"right"}}>{item.totalUnits}u</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode]           = useState("patient");
  const [screen, setScreen]       = useState("login");
  const [patient, setPatient]     = useState(null);
  const [patients, setPatients]   = useState(DEMO_PATIENTS);
  const [orderItems, setOrderItems] = useState({});
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("All");
  const [allOrders, setAllOrders] = useState([]);
  const [loginForm, setLoginForm] = useState({nhs:"",dob:""});
  const [loginError, setLoginError] = useState("");

  const currentPatient = patient ? (patients.find(p=>p.id===patient.id)||patient) : null;
  const effectiveAllowance = currentPatient ? currentPatient.allowance + (currentPatient.breastfeeding?4:0) + (currentPatient.pregnancy3rd?1:0) : 0;

  const usedUnits = useMemo(()=>
    Object.entries(orderItems).reduce((sum,[id,qty])=>{
      const p=PRODUCTS.find(p=>p.id===parseInt(id));
      return sum+(p?p.units*qty:0);
    },0),[orderItems]);

  const orderCount = Object.values(orderItems).reduce((a,b)=>a+b,0);

  const filteredProducts = useMemo(()=>
    PRODUCTS.filter(p=>{
      const matchCat = category==="All"||p.category===category;
      const q=search.toLowerCase();
      return matchCat&&(!q||p.name.toLowerCase().includes(q)||p.brand.toLowerCase().includes(q)||p.pip.includes(q));
    }),[category,search]);

  function handleLogin() {
    if (loginForm.nhs.replace(/\s/g,"").length<3||!loginForm.dob){setLoginError("Please enter your NHS number and date of birth.");return;}
    setLoginError(""); setScreen("setup");
  }

  function handleSetup(p) {
    const base=ALLOWANCES.find(a=>a.label===p.allowanceLabel);
    if(!p.name||!p.allowanceLabel||!p.pharmacy){alert("Please fill in your name, patient category, and nominated pharmacy.");return;}
    const newPat={...p,id:`P${Date.now()}`,allowance:base?base.units:0};
    setPatient(newPat);
    setPatients(prev=>[...prev,newPat]);
    setScreen("browse");
  }

  function addItem(id){
    const p=PRODUCTS.find(p=>p.id===id);
    if(usedUnits+p.units>effectiveAllowance) return;
    setOrderItems(prev=>({...prev,[id]:(prev[id]||0)+1}));
  }
  function removeItem(id){
    setOrderItems(prev=>{const n={...prev};if(n[id]>1)n[id]--;else delete n[id];return n;});
  }

  function submitOrder(){
    const items=Object.entries(orderItems).map(([id,qty])=>{
      const p=PRODUCTS.find(p=>p.id===parseInt(id));
      return{...p,qty,totalUnits:p.units*qty};
    });
    setAllOrders(prev=>[{id:`ORD-${Date.now()}`,date:new Date().toLocaleDateString("en-GB"),
      pharmacy:currentPatient.pharmacy,patientId:currentPatient.id,
      items,totalUnits:usedUnits,allowance:effectiveAllowance,status:"Submitted"},...prev]);
    setOrderItems({});
    setScreen("confirm");
  }

  // Setup form state
  const [setupForm, setSetupForm] = useState({name:"",address:"",tel:"",allowanceLabel:"",breastfeeding:false,pregnancy3rd:false,pharmacy:""});

  if(mode==="pharmacist") return <PharmacistView allOrders={allOrders} setAllOrders={setAllOrders} patients={patients} setPatients={setPatients} setMode={setMode}/>;

  // ── LOGIN ──
  if(screen==="login") return (
    <div style={{minHeight:"100vh",background:NHS_WARM,fontFamily:"Arial, sans-serif"}}>
      <NHSHeader mode={mode} setMode={setMode}/>
      <div style={{maxWidth:420,margin:"60px auto",padding:24}}>
        <div style={{background:"#fff",borderRadius:8,padding:32,boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
          <h2 style={{color:NHS_DARK,marginTop:0}}>Sign in</h2>
          <p style={{color:"#425563",fontSize:14}}>Use your NHS number and date of birth to access your prescription.</p>
          <label style={labelStyle}>NHS Number</label>
          <input style={inputStyle} placeholder="e.g. 485 777 3456" value={loginForm.nhs} onChange={e=>setLoginForm(f=>({...f,nhs:e.target.value}))}/>
          <label style={labelStyle}>Date of Birth</label>
          <input style={inputStyle} type="date" value={loginForm.dob} onChange={e=>setLoginForm(f=>({...f,dob:e.target.value}))}/>
          {loginError&&<p style={{color:NHS_RED,fontSize:13,margin:"8px 0"}}>{loginError}</p>}
          <button style={btnPrimary} onClick={handleLogin}>Sign in</button>
          <p style={{fontSize:12,color:"#768692",marginTop:16,textAlign:"center"}}>Your GP or pharmacist will have given you your NHS number.</p>
        </div>
      </div>
    </div>
  );

  // ── SETUP ──
  if(screen==="setup") return (
    <div style={{minHeight:"100vh",background:NHS_WARM,fontFamily:"Arial, sans-serif"}}>
      <NHSHeader mode={mode} setMode={setMode}/>
      <div style={{maxWidth:500,margin:"40px auto",padding:"0 16px"}}>
        <div style={{background:"#fff",borderRadius:8,padding:32,boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
          <h2 style={{color:NHS_DARK,marginTop:0}}>Your Profile</h2>
          <label style={labelStyle}>Full Name *</label>
          <input style={inputStyle} value={setupForm.name} onChange={e=>setSetupForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Jane Smith"/>
          <label style={labelStyle}>Address</label>
          <input style={inputStyle} value={setupForm.address} onChange={e=>setSetupForm(f=>({...f,address:e.target.value}))} placeholder="Your address"/>
          <label style={labelStyle}>Telephone</label>
          <input style={inputStyle} value={setupForm.tel} onChange={e=>setSetupForm(f=>({...f,tel:e.target.value}))} placeholder="Your phone number"/>
          <label style={labelStyle}>Patient Category *</label>
          <select style={inputStyle} value={setupForm.allowanceLabel} onChange={e=>setSetupForm(f=>({...f,allowanceLabel:e.target.value}))}>
            <option value="">Select your category…</option>
            {ALLOWANCES.map(a=><option key={a.label} value={a.label}>{a.label} — {a.units} units/month</option>)}
          </select>
          <div style={{display:"flex",gap:16,marginTop:12,marginBottom:8}}>
            <label style={{fontSize:14,color:"#425563",display:"flex",alignItems:"center",gap:6,cursor:"pointer"}}>
              <input type="checkbox" checked={setupForm.breastfeeding} onChange={e=>setSetupForm(f=>({...f,breastfeeding:e.target.checked}))}/>
              Breastfeeding (+4)
            </label>
            <label style={{fontSize:14,color:"#425563",display:"flex",alignItems:"center",gap:6,cursor:"pointer"}}>
              <input type="checkbox" checked={setupForm.pregnancy3rd} onChange={e=>setSetupForm(f=>({...f,pregnancy3rd:e.target.checked}))}/>
              3rd trimester (+1)
            </label>
          </div>
          <label style={labelStyle}>Nominated Pharmacy *</label>
          <input style={inputStyle} value={setupForm.pharmacy} onChange={e=>setSetupForm(f=>({...f,pharmacy:e.target.value}))} placeholder="e.g. Boots, High Street, Glasgow"/>
          <button style={{...btnPrimary,marginTop:20}} onClick={()=>handleSetup(setupForm)}>Save & Continue →</button>
        </div>
      </div>
    </div>
  );

  // ── BROWSE ──
  if(screen==="browse") return (
    <div style={{minHeight:"100vh",background:NHS_WARM,fontFamily:"Arial, sans-serif"}}>
      <NHSHeader mode={mode} setMode={setMode}/>
      <UnitBar used={usedUnits} allowance={effectiveAllowance}/>
      <NavBar screen={screen} setScreen={setScreen} orderCount={orderCount}/>
      <div style={{maxWidth:900,margin:"20px auto",padding:"0 16px"}}>
        <input style={{...inputStyle,marginBottom:12,fontSize:15}} placeholder="🔍  Search by product, brand, or PIP code…" value={search} onChange={e=>setSearch(e.target.value)}/>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
          {CATEGORIES.map(c=>(
            <button key={c} onClick={()=>setCategory(c)}
              style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${category===c?NHS_BLUE:"#bfc8cd"}`,
                background:category===c?NHS_BLUE:"#fff",color:category===c?"#fff":"#425563",
                cursor:"pointer",fontSize:13,fontWeight:category===c?700:400}}>
              {CAT_ICONS[c]} {c}
            </button>
          ))}
        </div>
        <div style={{display:"grid",gap:10}}>
          {filteredProducts.map(p=>{
            const qty=orderItems[p.id]||0;
            const wouldExceed=usedUnits+p.units>effectiveAllowance&&qty===0;
            const bs=BRAND_STYLES[p.brand]||{bg:"#607d8b",light:"#eceff1"};
            const url=PRODUCT_LINKS[p.id]||bs.url;
            return (
              <div key={p.id} style={{background:"#fff",borderRadius:8,display:"flex",alignItems:"stretch",
                boxShadow:"0 1px 4px rgba(0,0,0,0.07)",overflow:"hidden",opacity:wouldExceed?0.5:1,borderLeft:`4px solid ${bs.bg}`}}>
                <div style={{background:bs.light,padding:"12px 14px",display:"flex",alignItems:"center",justifyContent:"center",minWidth:80}}>
                  <BrandCard brand={p.brand} size={56}/>
                </div>
                <div style={{flex:1,padding:"12px 14px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4,flexWrap:"wrap"}}>
                    <span style={{fontSize:12,background:bs.bg,color:"#fff",padding:"2px 8px",borderRadius:4,fontWeight:700}}>{p.brand}</span>
                    <span style={{fontSize:11,color:"#768692"}}>{CAT_ICONS[p.category]} {p.category}</span>
                  </div>
                  <p style={{margin:"0 0 4px",fontWeight:700,color:"#1d2a32",fontSize:14,lineHeight:1.3}}>{p.name}</p>
                  <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                    <span style={{fontSize:12,color:"#768692"}}>PIP: <strong style={{color:"#425563"}}>{p.pip}</strong></span>
                    <span style={{fontSize:12,fontWeight:700,color:NHS_DARK}}>{p.units} unit{p.units!==1?"s":""}</span>
                    <a href={url} target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:NHS_BLUE,textDecoration:"none",fontWeight:600}}>View product ↗</a>
                  </div>
                </div>
                <div style={{padding:"12px 14px",display:"flex",alignItems:"center",gap:8}}>
                  {qty>0?(
                    <>
                      <button onClick={()=>removeItem(p.id)} style={qtyBtn}>−</button>
                      <span style={{minWidth:20,textAlign:"center",fontWeight:700,color:NHS_DARK}}>{qty}</span>
                      <button onClick={()=>addItem(p.id)} style={{...qtyBtn,background:NHS_BLUE,color:"#fff",border:"none"}}>+</button>
                    </>
                  ):(
                    <button onClick={()=>addItem(p.id)} disabled={wouldExceed}
                      style={{background:wouldExceed?"#e8edee":NHS_BLUE,color:wouldExceed?"#999":"#fff",
                        border:"none",borderRadius:4,padding:"8px 16px",fontWeight:700,fontSize:13,cursor:wouldExceed?"not-allowed":"pointer"}}>
                      {wouldExceed?"Full":"Add"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {orderCount>0&&(
        <div style={{position:"sticky",bottom:0,background:"#fff",borderTop:"1px solid #d8dde0",padding:"12px 24px",textAlign:"center"}}>
          <button onClick={()=>setScreen("order")} style={{...btnPrimary,margin:0,display:"inline-block",width:"auto",padding:"12px 32px"}}>
            Review Order ({orderCount} item{orderCount!==1?"s":""}) →
          </button>
        </div>
      )}
    </div>
  );

  // ── ORDER ──
  if(screen==="order") return (
    <div style={{minHeight:"100vh",background:NHS_WARM,fontFamily:"Arial, sans-serif"}}>
      <NHSHeader mode={mode} setMode={setMode}/>
      <UnitBar used={usedUnits} allowance={effectiveAllowance}/>
      <NavBar screen={screen} setScreen={setScreen} orderCount={orderCount}/>
      <div style={{maxWidth:700,margin:"30px auto",padding:"0 16px"}}>
        <h2 style={{color:NHS_DARK}}>My Order</h2>
        <div style={{background:"#fff",borderRadius:8,padding:16,marginBottom:16,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
          <p style={{margin:"0 0 4px",fontSize:14}}><strong>Patient:</strong> {currentPatient?.name}</p>
          <p style={{margin:"0 0 4px",fontSize:14}}><strong>Pharmacy:</strong> {currentPatient?.pharmacy}</p>
          <p style={{margin:0,fontSize:14}}><strong>Allowance:</strong> {effectiveAllowance} units/month</p>
        </div>
        {orderCount===0?(
          <div style={{background:"#fff",borderRadius:8,padding:32,textAlign:"center",color:"#768692"}}>
            <p style={{fontSize:24}}>🛒</p>
            <p>Your order is empty. <button onClick={()=>setScreen("browse")} style={{background:"none",border:"none",color:NHS_BLUE,cursor:"pointer",fontWeight:700,padding:0}}>Browse products →</button></p>
          </div>
        ):(
          <>
            <div style={{display:"grid",gap:8,marginBottom:16}}>
              {Object.entries(orderItems).map(([id,qty])=>{
                const p=PRODUCTS.find(p=>p.id===parseInt(id));
                const bs=BRAND_STYLES[p.brand]||{bg:"#607d8b",light:"#eceff1"};
                return (
                  <div key={id} style={{background:"#fff",borderRadius:8,display:"flex",alignItems:"center",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",overflow:"hidden",borderLeft:`4px solid ${bs.bg}`}}>
                    <div style={{background:bs.light,padding:"10px 12px"}}><BrandCard brand={p.brand} size={44}/></div>
                    <div style={{flex:1,padding:"10px 12px"}}>
                      <p style={{margin:"0 0 2px",fontWeight:700,fontSize:13,color:"#1d2a32"}}>{p.brand} — {p.name}</p>
                      <p style={{margin:0,fontSize:11,color:"#768692"}}>PIP: {p.pip} · {p.units}u each</p>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8,padding:"0 12px"}}>
                      <button onClick={()=>removeItem(p.id)} style={qtyBtn}>−</button>
                      <span style={{minWidth:20,textAlign:"center",fontWeight:700}}>{qty}</span>
                      <button onClick={()=>addItem(p.id)} style={{...qtyBtn,background:NHS_BLUE,color:"#fff",border:"none"}}>+</button>
                      <span style={{marginLeft:8,fontWeight:700,color:NHS_DARK,fontSize:14,minWidth:32,textAlign:"right"}}>{p.units*qty}u</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{background:NHS_DARK,color:"#fff",borderRadius:8,padding:"14px 20px",display:"flex",justifyContent:"space-between",marginBottom:20}}>
              <span style={{fontWeight:700}}>Total Units</span>
              <span style={{fontWeight:700}}>{usedUnits} / {effectiveAllowance}</span>
            </div>
            <button onClick={submitOrder} style={{...btnPrimary,fontSize:16,padding:"14px 0"}}>Submit Order to Pharmacy</button>
          </>
        )}
      </div>
    </div>
  );

  // ── CONFIRM ──
  if(screen==="confirm") return (
    <div style={{minHeight:"100vh",background:NHS_WARM,fontFamily:"Arial, sans-serif"}}>
      <NHSHeader mode={mode} setMode={setMode}/>
      <div style={{maxWidth:500,margin:"60px auto",padding:"0 16px",textAlign:"center"}}>
        <div style={{background:"#fff",borderRadius:8,padding:40,boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
          <div style={{fontSize:52,marginBottom:16}}>✅</div>
          <h2 style={{color:NHS_GREEN,marginTop:0}}>Order Submitted</h2>
          <p style={{color:"#425563",fontSize:15}}>Your order has been sent to <strong>{currentPatient?.pharmacy}</strong>.</p>
          <p style={{fontSize:13,color:"#768692"}}>Please allow time for your pharmacist to dispense your items.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:24,flexWrap:"wrap"}}>
            <button onClick={()=>setScreen("browse")} style={{...btnPrimary,margin:0,width:"auto",padding:"10px 24px"}}>Start New Order</button>
            <button onClick={()=>setScreen("history")} style={{background:"none",border:`2px solid ${NHS_BLUE}`,color:NHS_BLUE,borderRadius:4,padding:"10px 24px",cursor:"pointer",fontWeight:700,fontSize:14}}>View History</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── HISTORY ──
  if(screen==="history") return (
    <div style={{minHeight:"100vh",background:NHS_WARM,fontFamily:"Arial, sans-serif"}}>
      <NHSHeader mode={mode} setMode={setMode}/>
      <NavBar screen={screen} setScreen={setScreen} orderCount={orderCount}/>
      <div style={{maxWidth:700,margin:"30px auto",padding:"0 16px"}}>
        <h2 style={{color:NHS_DARK}}>Order History</h2>
        {allOrders.filter(o=>o.patientId===currentPatient?.id).length===0?(
          <div style={{background:"#fff",borderRadius:8,padding:32,textAlign:"center",color:"#768692"}}>No orders yet.</div>
        ):allOrders.filter(o=>o.patientId===currentPatient?.id).map(order=>(
          <div key={order.id} style={{background:"#fff",borderRadius:8,padding:20,marginBottom:16,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,flexWrap:"wrap",gap:8}}>
              <div>
                <span style={{fontWeight:700,color:NHS_DARK}}>{order.id}</span>
                <span style={{marginLeft:12,fontSize:13,color:"#768692"}}>{order.date}</span>
              </div>
              <span style={{background:order.status==="Dispensed"?"#e8f5e9":"#e3f0fb",
                color:order.status==="Dispensed"?NHS_GREEN:NHS_BLUE,
                fontSize:12,fontWeight:700,padding:"3px 10px",borderRadius:12}}>
                {order.status==="Dispensed"?"✓ Dispensed":"⏳ Pending"}
              </span>
            </div>
            <p style={{margin:"0 0 8px",fontSize:13,color:"#425563"}}>Pharmacy: {order.pharmacy} · {order.totalUnits}/{order.allowance}u</p>
            <div style={{borderTop:"1px solid #f0f4f5",paddingTop:8,display:"grid",gap:3}}>
              {order.items.map((item,i)=>{
                const bs=BRAND_STYLES[item.brand]||{bg:"#607d8b"};
                return (
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8,fontSize:13}}>
                    <div style={{width:8,height:8,borderRadius:2,background:bs.bg,flexShrink:0}}/>
                    <span style={{flex:1,color:"#1d2a32"}}>{item.brand} — {item.name} ×{item.qty}</span>
                    <span style={{fontWeight:700,color:NHS_DARK}}>{item.totalUnits}u</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}