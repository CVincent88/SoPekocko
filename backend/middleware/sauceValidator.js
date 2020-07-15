const validate = require('mongoose-validator');

exports.nameValidator = [  // Sauce name validation
    validate({
      validator: 'isLength',
      arguments: [3, 30], // Between 3 and 30 characters long
      message: "Le nom de votre Sauce doit contenir entre {ARGS[0]} and {ARGS[1]} caractères",
    }),
    validate({
      validator: 'matches',
      arguments: /^[a-z\d\-\sÂâäÄàÀËëÉéÈèÊÊÎîÏïÔôöÖÛûÜü']+$/i,  // Only letters and numbers
      message: "Vous ne pouvez utiliser que des chiffres et des lettres pour le nom de votre sauce",
    }),
];
  
  exports.manufacturerValidator = [ // Sauce manufacturer validation
      validate({
        validator: 'isLength',
        arguments: [3, 30],  // Between 3 and 30 characters long
        message: "Le nom du fabricant doit contenir entre {ARGS[0]} and {ARGS[1]} caractères",
      }),
      validate({
        validator: 'matches',
        arguments: /^[a-z\d\-\sÂâäÄàÀËëÉéÈèÊÊÎîÏïÔôöÖÛûÜü']+$/i, // Only letters and numbers
        message: "Vous ne pouvez utiliser que des chiffres et des lettres pour le nom du fabricant",
      }),
    ];
  
    exports.descriptionValidator = [  //  Sauce description validation
      validate({
        validator: 'isLength',
        arguments: [3, 200],
        message: "La description doit contenir entre {ARGS[0]} and {ARGS[1]} caractères",
      }),
      validate({
        validator: 'matches',
        arguments: /^[a-z\d\-\sÂâäÄàÀËëÉéÈèÊÊÎîÏïÔôöÖÛûÜü']+$/i, // Only letters and numbers
        message: "Vous ne pouvez utiliser que des chiffres et des lettres pour la description de la sauce",
      }),
    ];
  
    exports.pepperValidator = [  // Main ingredient validation
      validate({
        validator: 'isLength',
        arguments: [2, 15],  // Has to be between 2 and 15 characters long
        message: 'Le nom de l\'ingrédient principal doit contenir entre {ARGS[0]} and {ARGS[1]} caractères',
      }),
      validate({
        validator: 'matches',
        arguments: /^[a-z\d\-\sÂâäÄàÀËëÉéÈèÊÊÎîÏïÔôöÖÛûÜü']+$/i, // Only letters and numbers
        message: "Vous ne pouvez utiliser que des chiffres et des lettres pour le nom de l'ingrédient principal",
      }),
    ];