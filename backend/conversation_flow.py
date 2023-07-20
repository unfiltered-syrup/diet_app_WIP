tree = {
   "question": "",
    "YES":{
        "question": "Are you on a keto diet?",
        "YES":{
            "question": "What are your favorite meat products?",
            "YES":{
                "question": "question4?",
                "YES":{
                    "question": "question5?",
                },
            },
        },
        "NO":{
            "question": "Are you on a carnivore diet?",
            "YES": {
                "question": "question 6?",
            },
            "NO": {
                "question": "question 7?",
            }
        },

    },
    "NO":{
        "question": "Are you vegan?:bi",
        "YES": {
            "question": "What are your favorite vegetable products?",
        },
        "NO":{
            "question": "What are your favorite vegetable or dairy products?",
        },
    }
}

tree_test = {
    "question": "Do you follow a specific diet plan?",
    "YES": {
        "question": "Which diet plan are you following? (Options: Keto, Paleo, Vegan, Vegetarian, Gluten-free, Other)",
        "KETO": {
            "question": "Do you have any allergies or intolerances that affect your Keto diet?",
            "YES": {
                "question": "Please specify your allergies or intolerances.",
                "FOLLOW_UP": {
                    "question": "Despite these, what are your favorite food items on a Keto diet?",
                },
            },
            "NO": {
                "question": "What are your favorite food items on a Keto diet?",
            },
        },
        "PALEO": {
            "question": "Do you have any allergies or intolerances that affect your Paleo diet?",
            "YES": {
                "question": "Please specify your allergies or intolerances.",
                "FOLLOW_UP": {
                    "question": "Despite these, what are your favorite food items on a Paleo diet?",
                },
            },
            "NO": {
                "question": "What are your favorite food items on a Paleo diet?",
            },
        },
        "VEGAN": {
            "question": "Do you have any allergies or intolerances that affect your Vegan diet?",
            "YES": {
                "question": "Please specify your allergies or intolerances.",
                "FOLLOW_UP": {
                    "question": "Despite these, what are your favorite food items on a Vegan diet?",
                },
            },
            "NO": {
                "question": "What are your favorite food items on a Vegan diet?",
            },
        },
        "VEGETARIAN": {
            "question": "Do you have any allergies or intolerances that affect your Vegetarian diet?",
            "YES": {
                "question": "Please specify your allergies or intolerances.",
                "FOLLOW_UP": {
                    "question": "Despite these, what are your favorite food items on a Vegetarian diet?",
                },
            },
            "NO": {
                "question": "What are your favorite food items on a Vegetarian diet?",
            },
        },
        "GLUTEN-FREE": {
            "question": "Do you have any allergies or intolerances that affect your Gluten-free diet?",
            "YES": {
                "question": "Please specify your allergies or intolerances.",
                "FOLLOW_UP": {
                    "question": "Despite these, what are your favorite food items on a Gluten-free diet?",
                },
            },
            "NO": {
                "question": "What are your favorite food items on a Gluten-free diet?",
            },
        },
    },
    "NO": {
        "question": "Do you have any food allergies or intolerances?",
        "YES": {
            "question": "Please specify your allergies or intolerances.",
            "FOLLOW_UP": {
                "question": "Despite these, what are your favorite foods or food groups to include in your meals?",
            },
        },
        "NO": {
            "question": "What are your favorite foods or food groups to include in your meals?",
        },
    },
}

    #make decisions based on user_input
def make_decision(answer, question_id):
    node = tree  # Set node to the whole tree
    if not question_id or question_id == ":":
        if not answer:
            return node["question"]
        else:
            return node[answer]['question']
    for a in question_id.split(":"):
        #print('value of a:'+ a)
        node = node[a]
    if isinstance(node, str):
        #print("node" + node)
        return node
    if answer in node:
        node = node[answer]
    if isinstance(node, str):
        return node
    return node['question']

def record_diet_plan_pref(pref_vec, question_type):
    match question_type:
        case "vegan":
            pref_vec = vegan_config()
        case "keto":
            pref_vec = keto_config()
        case "gluten-free":
            pref_vec = gluten_free_config()
        case "vegetarian":
            pref_vec = vegetarian_config()
        case "paleo":
            pref_vec = paleo_config()

    return pref_vec

def vegan_config(pref_vec): #TODO after data pre-processing is done, set preference vec based on group label
    return pref_vec

def keto_config(pref_vec):
    return pref_vec

def gluten_free_config(pref_vec):
    return pref_vec

def vegetarian_config(pref_vec):
    return pref_vec

def paleo_config(pref_vec):
    return pref_vec