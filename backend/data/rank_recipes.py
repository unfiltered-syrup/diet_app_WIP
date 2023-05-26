import timeit
mysetup = "import math"
import math
#sample vectors
mycode = '''
recipes = [[1,0,1,1,0,1,0,1],
[1,0,0,1,1,0,1,0],
[1,0,1,1,0,1,0,1],
[1,1,1,1,1,1,1,1]]

user_preference = [1,0,1,0,0,1,0,0]
ranked_recipes = []
index = 0
#calculate euclidean distance, data saved in format: [index, euclidean distance]
for recipe in recipes:
    dist = [(a-b)**2 for a,b in zip(recipe, user_preference)]
    dist = math.sqrt(sum(dist))
    ranked_recipes.append([index, dist])
    index += 1

#merge sort recipes based on euclidean distance
def merge_sort(array):
    #when there is only one iput
    if len(array) < 2:
        return array
    #find mid point
    middle = len(array) // 2
    left = array[:middle]
    right = array[middle:]
    if len(left) == 0:
        return right
    if len(right) == 0:
        return left
    left_index = 0
    right_index = 0
    result = []
    #sort
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
            result += right[right_index]
            break
    return result


ranked_recipes = merge_sort(ranked_recipes)
print(ranked_recipes)
'''
'''
print(timeit.timeit(setup=mysetup,
stmt=mycode,
number=10000))
'''

from random import sample
import matplotlib.pyplot as plt
#generate batch number and convert to binary
def generate(batch, dim):
    return [list(map(int, f'{n:0>32b}')) for n in sample(range(2**dim+1), batch)]

recipes = generate(1000,32)
user_preference = [1,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0]
ranked_recipes = []
index = 0
#calculate euclidean distance, data saved in format: [index, euclidean distance]
for recipe in recipes:
    dist = [(a-b)**2 for a,b in zip(recipe, user_preference)]
    dist = math.sqrt(sum(dist))
    ranked_recipes.append(['recipe'+str(index), dist])
    index += 1

#merge sort recipes based on euclidean distance
def merge(left,right):
    if len(left) == 0:
        return right
    if len(right) == 0:
        return left
    left_index = 0
    right_index = 0
    result = []
    #sort
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
    #when there is only one iput
    if len(array) < 2:
        return array
    #find mid point
    middle = len(array) // 2
    return merge(
        left=merge_sort(array[:middle]),
        right=merge_sort(array[middle:])
    )


ranked_recipes = merge_sort(ranked_recipes)
print(ranked_recipes)

#visualize
x = list(list(zip(*ranked_recipes))[1])[:15]
y = list(list(zip(*ranked_recipes))[0])[:15]
plt.barh(y,x)
plt.ylabel('Recipe Name')
plt.xlabel('Euclidean Distance To User Preference')
plt.title('User Preferred Recipes')
plt.show()