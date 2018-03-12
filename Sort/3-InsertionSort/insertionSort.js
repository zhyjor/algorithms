function insertionSort(arr){
    let len = arr.length
    let preIndex,current
    for(let i = 1;i<len;i++){
        preIndex = i-1
        // 待插入的元素
        current = arr[i]
        while(preIndex >=0 && arr[preIndex]>current){
            arr[preIndex+1] = arr[preIndex]
            preIndex --
        }
        arr[preIndex+1]=current
    }
    return arr
}


console.log(insertionSort([1,4,3,5,1]))