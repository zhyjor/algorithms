def selectionSort(arr):
    for i in range(len(arr)-1):
        minIndex = i
        for j in range(i+1,len(arr)):
            if(arr[j]<arr[minIndex]):
                minIndex = j
        # i不是最小数字时，将i和最小数交换
        if i != minIndex:
            arr[i],arr[minIndex] = arr[minIndex],arr[i]
    return arr

print(selectionSort([54,3,2,1]))

