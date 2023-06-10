import math
import random
from random import sample
import matplotlib.pyplot as plt


# generate batch number with binary & none value randomly
def n_generate(batch, dim):
    output = []
    for i in range(batch):
        values = [random.choice([0, 1, None]) for j in range(dim)]
        output.append(values)
    return output


def generate(batch, dim):
    output = []
    for i in range(batch):
        values = [random.choice([0, 1]) for j in range(dim)]
        output.append(values)
    return output


# Calculate euclidean distance with missing values
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


# replace the none value in arr1 with value in arr2 of same index
def replace_none_values(arr1, arr2):
    result = []
    for val1, val2 in zip(arr1, arr2):
        if val1 is None:
            result.append(val2)
        else:
            result.append(val1)
    return result


def test():
    user_vec = n_generate(1, 1000)[0]  # [0]!!!
    print(user_vec)
    samples = generate(1000, 1000)
    smallest_index = 0
    smallest = 1000
    values = []
    for idx, x in enumerate(samples):
        dist = null_euclidean(user_vec, x)
        values.append(dist)
        if dist < smallest:
            smallest = dist
            smallest_index = idx
    return replace_none_values(user_vec, samples[smallest_index])


# replace none values based on closest preference vector in database
# input_preference_vector: the input preference vector with none values
# preference_vectors: the preference vectors from database
# return : a 1 * 1000 preference vector without any none value
def user_to_user(input_preference_vector, preference_vectors):
    smallest_index = 0
    smallest = 1000
    values = []
    for idx, x in enumerate(preference_vectors):
        dist = null_euclidean(input_preference_vector, x)
        values.append(dist)
        if dist < smallest:
            smallest = dist
            smallest_index = idx
    return replace_none_values(
        input_preference_vector, preference_vectors[smallest_index]
    )


# print(test())
