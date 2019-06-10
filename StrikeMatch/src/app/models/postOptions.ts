export const postOptions = [
  {
    department: "electrical",
    children: [
      {
        subDepartment: "instruments",
        subcategories: [

          {
            title: "Source4",
            options: [{
              itemTitle: "description",
              subOptions: []
            }
            ]
          },
          {
            title: "Fresnel",
            options: [{
              itemTitle: "description",
              subOptions: []
            }
            ]

          },
          {
            title: "Pars",
            options: [{
              itemTitle: "description",
              subOptions: []
            }
            ]

          },
          {
            title: "Strips",
            options: [{
              itemTitle: "description",
              subOptions: []
            }
            ]

          },
          {
            title: "Other",
            options: [{
              itemTitle: "description",
              subOptions: []
            }
            ]

          },
        ]
      },

      {
        subDepartment: "cables",
        subcategories: [
          {
            title: "edison",
            options: ["enter length"]
          },
          {
            title: "stage pin",
            options: ["enter length"]
          },

          {
            title: "dmx",
            options: ["enter length, enter pin"]
          },

          {
            title: "other",
            options: ["enter anything relevant"]
          },

        ]
      },
      {
        subDepartment: "hardware",
        subcategories: [
          {
            title: "cheeseboroughs",
            options: [
              {
                itemTitle: "Swivel",
                subOptions: ["steel", "aluminum"]
              },
              {
                itemTitle: "Rigid",
                subOptions: ["steel", "aluminum"]
              },
              {
                itemTitle: "HalfBoro",
                suboptions: ["steel", "aluminum"]
              },
            ]

          },
          {
            title: 'schedule40',
            options: [{
              itemTitle: "enter length"
            }]
          },
          {
            title: "Boom Base",
            options: []
          },
          {
            title: "Side Arms",
            options: []
          },
          {
            title: "C Clamps",
            options: []
          },
          {
            title: "Safety Cables",
            options: []
          },
          {
            title: "other",
            options: []
          },

        ]

      },
      {
        subDepartment: "Miscelaneous",
        subcategories: [
          {
            title: "Fog Machines",
            options: [
              {
                itemTitle: "Specify Type",
              },
            ]
          },
          {
            title: "Fog Fluid",
            options: [
              {
                itemTitle: "Specify Type"
              }
            ]
          },
          {
            title: "LED Tape",
            options: [
              {
                itemTitle: "Specify Color, Width, and Length"
              },

            ]
          },
          {
            title: "Power Supplies",
            options: [
              {
                itemTitle: "Specify Type"
              }
            ]
          },
          {
            title: "Decoders",
            options: [
              {
                itemTitle: "Specify Type"
              }
            ]
          }]
      },
      {
        subDepartment: "Accessories",
        subcategories: [{
          title: "Barn Doors",
          options: [{
            itemTitle: "Specify Size"
          }]
        },
        {
          title: "Tophats",
          options:[{
            itemTitle: "Specify Size",
          }]
        },
        {
          title: "Eyelash",
          options:[{
            itemTitle: "Specify Size",
          }]
        },
        {
          title: "Gelframes",
          options:[{
            itemTitle: "Specify Size",
          }]
        },
        {
          title: "Template Holder",
          options:[{
            itemTitle: "Specify Size",
          }]
        },
        {
          title: "Gobos",
          options:[{
            itemTitle: "Enter Description",
          }]
        },
        {
          title: "Lcue",
          options:[{
            itemTitle: "Enter Description",
          }]
        },
        {
          title: "Other",
          options:[{
            itemTitle: "Enter Description",
          }]
        }]
      },
      {
        subDepartment:"Consumables",
        subcategories:[{
          title:"Lamps",
          options:[{
            itemTitle:"Specify Base and Wattage"
          },
        ]
        },
        {
          title:"Gel",
          options:[{
            itemTitle:"Specify Colors and Sizez"
          },
        ]
        },
        {
          title:"Other",
          options:[{
            itemTitle:"Enter Description"
          },
        ]
        }]
      }
    ]
  },
  {
    department: "scenery",
    children: [
      {
        subDepartment: "materials",
        subcategories: [
          {
            title: "lumber",
            options: [
              {
                itemTitle: "sheet",
                subOptions: [{
                  optionTitle: "masonite",
                  optionSpecifics: ["enter", "2x4 specifics", "other specifics"]
                },
                {
                  optionTitle: "plywood",
                  optionSpecifics: ["enter", "4x8 specifics",]
                }]
              },
              {
                itemTitle: "stick",
                subOptions: [{
                  optionTitle: "2x4",
                  optionSpecifics: ["enter", "whether painted", "length"]
                },
                {
                  optionTitle: "other",
                  optionSpecifics: ["enter", "whether painted", "length", "description"]
                }]
              },
            ]
          },

          {
            title: "hardware",
            options: [{
              itemTitle: "pipe",
              subOptions: [{
                optionTitle: "pipe/drape",
                optionSpecifics: ["enter", "length"]
              },
              {
                optionTitle: "schedule 40",
                optionSpecifics: ["enter", "length"]
              },
              {
                optionTitle: "other",
                optionSpecifics: ["enter", "length"]
              }
              ]
            },
            {
              itemTitle: "track",
              subOptions: [
                {
                  optionTitle: "I",
                  optionSpecifics: ["enter", "length"]
                },
                {
                  optionTitle: "U",
                  optionSpecifics: ["enter", "length"]
                },
                {
                  optionTitle: "carriers",
                  optionSpecifics: ["enter", "length"]
                }]
            },
            {
              itemTitle: "casters ",
              subOptions: [{
                optionTitle: "casters",
                optionSpecifics: ["enter", "length", "weight load"]
              }]
            },
            {
              itemTitle: "fasteners ",
              subOptions: [{
                optionTitle: "nails",
                optionSpecifics: ["enter", "ammount", "size"]
              },
              {
                optionTitle: "screws",
                optionSpecifics: ["enter", "ammount", "size"]
              }]
            },
            {
              itemTitle: "brackets",
              subOptions: [{
                optionTitle: "brackets",
                optionSpecifics: ["enter", "size"]
              }]
            },
            {
              itemTitle: "door",
              subOptions: [{
                optionTitle: "nobs",
                optionSpecifics: ["enter", "size"]
              },
              {
                optionTitle: "other",
                optionSpecifics: ["enter", "size"]
              }]
            },
            {
              itemTitle: "hinges",
              subOptions: [{
                optionTitle: "hinges",
                optionSpecifics: ["enter", "size"]
              }]
            },
            {
              itemTitle: "other",
              subOptions: [{
                optionTitle: "other",
                optionSpecifics: ["enter", "relevant info"]
              }]
            }
            ]
          },
          {
            title: "soft goods",
            options: [{
              itemTitle: "duvetyn",
              subOptions: [{
                optionTitle: "duvetyn",
                optionSpecifics: ["enter", "yardage"]
              },
              {
                subOptions: [{
                  optionTitle: "muslin",
                  optionSpecifics: ["enter", "yardage"]
                }]
              },
              {
                subOptions: [{
                  optionTitle: "other",
                  optionSpecifics: ["enter", "yardage"]
                },
                ]
              }]
            }]
          },

          {
            title: "paint",
            options: [{
              itemTitle: "color",
              subOptions: [{
                optionTitle: "eggshell",
                optionSpecifics: ["enter", "gallons"]
              },
              {
                optionTitle: "semi gloss",
                optionSpecifics: ["enter", "gallons"]
              },
              {
                optionTitle: "flat",
                optionSpecifics: ["enter", "gallons"]
              }]
            },
            {
              itemTitle: "primer",
              subOptions: [
                {
                  optionTitle: "primer",
                  optionSpecifics: ["enter", "gallons"]
                },
              ]
            },
            {
              itemTitle: "joint compound",
              subOptions: [
                {
                  optionTitle: "joint compound",
                  optionSpecifics: ["enter", "gallons"]
                },
              ]
            },
            {
              itemTitle: "brushes",
              subOptions: [
                {
                  optionTitle: "used / washed",
                  optionSpecifics: ["enter", "ammount"]
                },
                {
                  optionTitle: "new",
                  optionSpecifics: ["enter", "ammount"]
                }
              ]
            },
            ]
          }]
      },


      {
        subDepartment: "built/bought",
        subcategories: [{
          title: 'flats (1 by fram, 1/4" luan)',
          options: [{
            itemTitle: "4x8",
            subOptions: [{
              optionTitle: "painted",
              optionSpecifics: ["enter", "number"]

            },
            {
              optionTitle: "unpainted",
              optionSpecifics: ["enter", "number"]

            }
            ]
          },
          ]
        },
        {
          title: "doors",
          options: [{
            itemTitle: "interior",
            subOptions: [{
              optionTitle: "in frame",
              optionSpecifics: ["enter", "size"]
            },
            {
              optionTitle: "stand alone",
              optionSpecifics: ["enter", "size"]
            }]
          },
          {
            itemTitle: "exterior",
            subOptions: [{
              optionTitle: "in frame",
              optionSpecifics: ["enter", "size"]
            },
            {
              optionTitle: "stand alone",
              optionSpecifics: ["enter", "size"]
            }]
          }]
        },
        {
          title: "decking/flooring",
          options: [{
            itemTitle: "wooden platforms",
            subOptions: [{
              optionTitle: "4x8",
              optionSpecifics: ["enter", "height"]
            },
            {
              optionTitle: "other",
              optionSpecifics: ["enter", "height"]

            }]
          },
          {
            itemTitle: "steel deck",
            subOptions: [{
              optionTitle: "4x8",
              optionSpecifics: ["enter", "height"]
            },
            {
              optionTitle: "other",
              optionSpecifics: ["enter", "height"]
            }]
          },
          {
            itemTitle: "marly",
            subOptions: [{
              optionTitle: "marly",
              optionSpecifics: ["enter", "color"]
            }]
          },
          {
            itemTitle: "carpet",
            subOptions: [{
              optionTitle: "color",
              optionSpecifics: ["enter", "color", "pile"]
            }]
          },
          {
            itemTitle: "other",
            subOptions: [{
              optionTitle: "other",
              optionSpecifics: ["enter", "specifics"]
            }]
          }]
        },

        {
          title: "soft goods",
          options: [{
            itemTitle: "cycs",
            subOptions: [{
              optionTitle: "cycs",
              optionSpecifics: ["enter", "dimensions", "fabric type", "color", "fullness", "webbing?", "flame cert?"]
            },
            ]
          },
          {
            itemTitle: "legs",
            subOptions: [{
              optionTitle: "legs",
              optionSpecifics: ["enter", "dimensions", "fabric type", "color", "fullness", "webbing?", "flame cert?"]
            },
            ]
          },
          {
            itemTitle: "border",
            subOptions: [{
              optionTitle: "border",
              optionSpecifics: ["enter", "dimensions", "fabric type", "color", "fullness", "webbing?", "flame cert?"]
            },
            ]
          },
          {
            itemTitle: "backdrops",
            subOptions: [{
              optionTitle: "backdrops",
              optionSpecifics: ["enter", "dimensions", "fabric type", "color", "fullness", "webbing?", "flame cert?"]
            },
            ]
          }]
        }

        ]
      }
    ]
  },
  {
    department:"costumes",
    children:[{
      subDepartment:"Period",
      subcategories:[{
        title:null,
        options:[{
          itemTitle:null,
          subOptions:[{
            optionTitle:null,
            optionSpecifics:[""]
          }]
        }]
      }]
    },
    {
      subDepartment:"Uniform",
      subcategories:[{
        title:null,
        options:[{
          itemTitle:null,
          subOptions:[{
            optionTitle:null,
            optionSpecifics:[""]
          }]
        }]
      }]
    },
    {
      subDepartment:"Specialty",
      subcategories:[{
        title:null,
        options:[{
          itemTitle:null,
          subOptions:[{
            optionTitle:null,
            optionSpecifics:[""]
          }]
        }]
      }]
    },
    {
      subDepartment:"Equipment",
      subcategories:[{
        title:null,
        options:[{
          itemTitle:null,
          subOptions:[{
            optionTitle:null,
            optionSpecifics:[""]
          }]
        }]
      }]
    }]
  },
  {
    department:"",
    children:[{

    }]
  }
]
