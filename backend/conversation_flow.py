tree = {
    "question": "",
    "YES": {
        "question": "Are you on a keto diet?",
        "YES": {
            "question": "What are your favorite meat products?",
            "YES": {
                "question": "question4?",
                "YES": {
                    "question": "question5?",
                },
            },
        },
        "NO": {
            "question": "Are you on a carnivore diet?",
            "YES": {
                "question": "question 6?",
            },
            "NO": {
                "question": "question 7?",
            }
        },

    },
    "NO": {
        "question": "Are you vegan?:bi",
        "YES": {
            "question": "What are your favorite vegetable products?",
        },
        "NO": {
            "question": "What are your favorite vegetable or dairy products?",
        },
    }
}

tree_test = {
    "question": "Do you follow a specific diet plan?",
    "YES": {
        "question": "Which diet plan are you following? (options: Keto, Paleo, Vegan, Vegetarian, Gluten-free, Other)",
        "KETO": {
            "question": "Do you have any allergies or intolerances that affect your Keto diet?",
            "YES": {
                "question": "Please specify your allergies or intolerances.",
                "FOLLOW_UP": {
                    "question": "Despite these, what are your favorite food items on a Keto diet?",
                    "FOLLOW_UP":{
                    "question": "Thank you for your response",
                }
                },
            },
            "NO": {
                "question": "What are your favorite food items on a Keto diet?",
                "FOLLOW_UP":{
                    "question": "Thank you for your response",
                }
            },
        },
        "PALEO": {
            "question": "Do you have any allergies or intolerances that affect your Paleo diet?",
            "YES": {
                "question": "Please specify your allergies or intolerances.",
                "FOLLOW_UP": {
                    "question": "Despite these, what are your favorite food items on a Paleo diet?",
                    "FOLLOW_UP":{
                    "question": "Thank you for your response",
                }
                },
            },
            "NO": {
                "question": "What are your favorite food items on a Paleo diet?",
                "FOLLOW_UP":{
                    "question": "Thank you for your response",
                }
            },
        },
        "VEGAN": {
            "question": "Do you have any allergies or intolerances that affect your Vegan diet?",
            "YES": {
                "question": "Please specify your allergies or intolerances.",
                "FOLLOW_UP": {
                    "question": "Despite these, what are your favorite food items on a Vegan diet?",
                    "FOLLOW_UP":{
                    "question": "Thank you for your response",
                }
                },
            },
            "NO": {
                "question": "What are your favorite food items on a Vegan diet?",
                "FOLLOW_UP":{
                    "question": "Thank you for your response",
                }
            },
        },
        "VEGETARIAN": {
            "question": "Do you have any allergies or intolerances that affect your Vegetarian diet?",
            "YES": {
                "question": "Please specify your allergies or intolerances.",
                "FOLLOW_UP": {
                    "question": "Despite these, what are your favorite food items on a Vegetarian diet?",
                    "FOLLOW_UP":{
                    "question": "Thank you for your response",
                }
                },
            },
            "NO": {
                "question": "What are your favorite food items on a Vegetarian diet?",
                "FOLLOW_UP":{
                    "question": "Thank you for your response",
                }
            },
        },
        "GLUTEN-FREE": {
            "question": "Do you have any allergies or intolerances that affect your Gluten-free diet?",
            "YES": {
                "question": "Please specify your allergies or intolerances.",
                "FOLLOW_UP": {
                    "question": "Despite these, what are your favorite food items on a Gluten-free diet?",
                    "FOLLOW_UP":{
                    "question": "Thank you for your response",
                }
                },
            },
            "NO": {
                "question": "What are your favorite food items on a Gluten-free diet?",
                "FOLLOW_UP":{
                    "question": "Thank you for your response",
                }
            },
        },
        "OTHER": {
            "question": "Can you specify the specific diet plan you're following?",
            "FOLLOW_UP":{
                    "question": "Thank you for your response",
                }
        },
    },
    "NO": {
        "question": "Do you have any food allergies or intolerances?",
        "YES": {
            "question": "Please specify your allergies or intolerances.",
            "FOLLOW_UP": {
                "question": "Despite these, what are your favorite foods or food groups to include in your meals?",
                "FOLLOW_UP":{
                    "question": "Thank you for your response",
                }
            },
        },
        "NO": {
            "question": "What are your favorite foods or food groups to include in your meals?",
            "FOLLOW_UP":{
                    "question": "Thank you for your response",
                }
        },
    },
}

# make decisions based on user_input


def get_possible_answers(question):
    # add another function to make the recursion searching of tree work
    def search_for_question(tree):
        if "question" in tree and tree["question"] == question:
            return [option.upper() for option in tree.keys() if option != "question"]

        for subtree in tree.values():
            if isinstance(subtree, dict):
                result = search_for_question(subtree)
                if result:
                    return result
        return None

    global tree_test
    return search_for_question(tree_test)

def make_decision(answer, question_id):
    node = tree_test  # Set node to the whole tree
    if not question_id or question_id == ":":
        if not answer:
            return [node["question"], False]
        else:
            return [node[answer]['question'], False]
    for a in question_id.split(":"):
        try:
            print('value of a:' + a)
            node = node[a]
        except KeyError:
            print("KeyError")
            return [node['question'], True]
    if isinstance(node, str):
        print("node" + node)
        return [node, False]
    if answer in node:
        node = node[answer]
    if isinstance(node, str):
        return [node, False]
    
    #get_possible_answers(node['question'])
    print(node)
    return [node['question'], False]


def record_diet_plan_pref(pref_vec, question_type):
    if question_type == "vegan":
        pref_vec = vegan_config()
    elif question_type == "keto":
        pref_vec = keto_config()
    elif question_type == "gluten-free":
        pref_vec = gluten_free_config()
    elif question_type == "vegetarian":
        pref_vec = vegetarian_config()
    elif question_type == "paleo":
        pref_vec = paleo_config()

    return pref_vec


# TODO after data pre-processing is done, set preference vec based on group label
def vegan_config(pref_vec):
    return pref_vec


def keto_config(pref_vec):
    return pref_vec


def gluten_free_config(pref_vec):
    return pref_vec


def vegetarian_config(pref_vec):
    return pref_vec


def paleo_config(pref_vec):
    return pref_vec
