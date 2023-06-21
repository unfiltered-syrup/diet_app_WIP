tree = {
    "question": "Do you consume meat products?",
    "yes":{
        "question": "Are you on a keto diet?",
        "yes":{
            "question": "What are your favorite meat products?",
            "yes":{
                "question": "question4?",
                "yes":{
                    "question": "question5?",
                },
            },
        },
        "no":{
            "question": "Are you on a carnivore diet?",
        },

    },
    "no":{
        "question": "Are you vegan?",
        "yes": {
            "question": "What are your favorite vegetable products?",
        },
        "no":{
            "question": "What are your favorite vegetable or dairy products?",
        },
    }
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