tree = {
   ## "question": "Do you consume meat products?",
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
        },

    },
    "NO":{
        "question": "Are you vegan?",
        "YES": {
            "question": "What are your favorite vegetable products?",
        },
        "NO":{
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