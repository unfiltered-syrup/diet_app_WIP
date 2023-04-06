import sqlite3
from anytree import Node, RenderTree

#run this file with conda, if you are using pip, add dot executable to your path
cuisines = {
    "World Cuisines": {
        "Asian": {
            "South Asian": {
                "Indian": {},
                "Pakistani": {},
                "Sri Lankan": {},
                "Nepalese": {},
            },
            "East Asian": {
                "Japanese": {},
                "Chinese": {
                    "Szechuan": {},
                    "Beijing": {},
                    "Cantonese": {},
                    "Hunan": {},
                },
                "Korean": {},
                "Mongolian": {},
                "Taiwanese": {},
            },
            "Southeast Asian": {
                "Thai": {},
                "Vietnamese": {},
                "Indonesian": {},
                "Malaysian": {},
                "Filipino": {},
                "Burmese": {},
                "Singaporean": {},
            },
        },
        "American": {
            "North American": {
                "US": {},
                "Canadian": {},
            },
            "Latin American": {
                "Mexican": {},
                "Peruvian": {},
                "Brazilian": {},
                "Argentinian": {},
                "Cuban": {},
                "Colombian": {},
                "Venezuelan": {},
            },
        },
        "European": {
            "Western European": {
                "French": {},
                "German": {},
                "Austrian": {},
                "Swiss": {},
                "Dutch": {},
                "Belgian": {},
                "Irish": {},
                "British": {},
            },
            "Eastern European": {
                "Polish": {},
                "Czech": {},
                "Hungarian": {},
                "Romanian": {},
                "Bulgarian": {},
                "Russian": {},
                "Ukrainian": {},
            },
            "Mediterranean": {
                "Italian": {},
                "Spanish": {},
                "Portuguese": {},
                "Greek": {},
                "Turkish": {},
                "Lebanese": {},
                "Israeli": {},
            },
        },
        "African": {
            "North African": {
                "Moroccan": {},
                "Tunisian": {},
                "Algerian": {},
                "Egyptian": {},
            },
            "West African": {
                "Nigerian": {},
                "Ghanaian": {},
                "Senegalese": {},
                "Ivorian": {},
            },
            "East African": {
                "Ethiopian": {},
                "Eritrean": {},
                "Kenyan": {},
                "Tanzanian": {},
            },
            "Southern African": {
                "South African": {},
                "Zimbabwean": {},
                "Mozambican": {},
            },
        },
        "Oceanian": {
            "Australian": {},
            "New Zealand": {},
            "Pacific Islander": {
                "Hawaiian": {},
                "Samoan": {},
                "Fijian": {},
                "Tongan": {},
            },
        },
    },
}


def dict_to_tree(d, parent=None):
    for k, v in d.items():
        node = Node(k, parent=parent)
        if isinstance(v, dict):
            dict_to_tree(v, parent=node)
        elif isinstance(v, list):
            for item in v:
                if isinstance(item, dict):
                    dict_to_tree(item, parent=node)
                else:
                    Node(item, parent=node)


def create_tree_png(r):
    root = r
    dict_to_tree(cuisines, parent=root)

    # Print the tree
    for pre, _, node in RenderTree(root):
        print("%s%s" % (pre, node.name))

    from anytree.exporter import DotExporter
    DotExporter(root).to_picture('tree.png')

def get_tree():
    #return tree
    root = Node('root')
    dict_to_tree(cuisines, parent=root)
    return root

def get_all_children(node):
    #get children recursively
    nodes = [node]
    for child in node.children:
        nodes.extend(get_all_children(child))
    return nodes

def get_all_parent(node):
    #get parents
    parents = []
    while node.parent is not None:
        node = node.parent
        parents.append(node)
    return parents