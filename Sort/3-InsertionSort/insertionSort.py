def insertionSort(arr):
    for i in range(1,len(arr)):
        preIndex = i-1
        current = arr[i]
        while(preIndex>=0 and arr[preIndex]>current):
            arr[preIndex+1] = arr[preIndex]
            preIndex -=1
        arr[preIndex+1]=current
    return arr

print(insertionSort([3,2,2,1,1,1,21]))
            