import timeit
import math
import random
from random import sample
import matplotlib.pyplot as plt


# generate batch number and convert to binary
def generate(batch, dim):
    output = []
    for i in range(batch):
        values = [random.choice([0, 1]) for j in range(dim)]
        output.append(values)
    return output


def null_euclidean(arr1, arr2):
    total = 0
    weight = len(arr1)
    c = 0
    for i in range(len(arr1)):
        p1 = arr1[i]
        p2 = arr2[i]
        diff = 0
        if p1 == None or p2 == None:
            continue
        else:
            total += (p1 - p2) ** 2
            c += 1
    return math.sqrt((weight / c * total))


def dict_euclidean(arr, d):
    # Convert dictionary values to a list
    arr2 = list(d.values())
    # Check that arrays are of the same length
    if len(arr) != len(arr2):
        raise ValueError(
            "The array and dictionary must have the same number of elements."
        )
    distances = {}
    total = 0
    weight = len(arr)
    c = 0
    for i in range(0, len(arr2)):
        dist = null_euclidean(arr, arr2[i])
        distances[i] = dist
    return distances


# merge sort recipes based on euclidean distance
def merge(left, right):
    if len(left) == 0:
        return right
    if len(right) == 0:
        return left
    left_index = 0
    right_index = 0
    result = []
    # sort
    while len(result) < len(left) + len(right):
        if left[left_index][1] <= right[right_index][1]:
            result.append(left[left_index])
            left_index += 1
        else:
            result.append(right[right_index])
            right_index += 1
        if right_index == len(right):
            result += left[left_index:]
            break
        if left_index == len(left):
            result += right[right_index:]
            break
    return result


def merge_sort(array):
    # when there is only one iput
    if len(array) < 2:
        return array
    # find mid point
    middle = len(array) // 2
    return merge(left=merge_sort(array[:middle]), right=merge_sort(array[middle:]))


def get_euclidean_values(user_vec, samples):
    smallest_index = 0
    smallest = sys.maxsize
    values = []
    for x in samples:
        dist = null_euclidean(user_vec, x)  # [0]!!!!
        values.append(dist)


def merge_sort_dict(d):
    # Convert the dictionary into a list of tuples
    items = list(d.items())

    # Sort the list of tuples using merge_sort
    sorted_items = merge_sort(items)

    # Convert the sorted list of tuples back into a dictionary
    sorted_dict = dict(sorted_items)

    return sorted_dict


def test():
    user_vec = generate(1, 1000)[0]
    recipes = dict(enumerate(generate(1000, 1000), start=0))
    sorted_dict = merge_sort_dict(dict_euclidean(user_vec, recipes))

    return random.sample(list(sorted_dict.keys())[:50], 20)


# sort and generate top 20 recommended recipe
# input_preference_vector: the input preference vector without none values
# recipe_dictionary: the unsorted recipes extracted from database
# return : a list of 20 recipe id
def user_product(input_preference_vector, recipe_dictionary):
    sorted_dict = merge_sort_dict(
        dict_euclidean(input_preference_vector, recipe_dictionary)
    )
    return random.sample(list(sorted_dict.keys())[:50], 20)


#print(test())
