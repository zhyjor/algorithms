## 冒泡排序
冒泡排序（BubbleSort）是一种简单直观的算法。它需要重复的走过未完成排序的序列，一次比较两个元素，假如两者失序就交互顺序，直到走过的序列没有需要交换的元素，就可以认为排序已经完成。这种排序进行的时候，每走过一轮序列，就会找到一个最大值，因此较小的元素是逐渐浮到序列的顶端，因此称冒泡。

冒泡可以设置一个flag，当一趟排序没有发生元素交换的时候就证明该序列已经有序了，这种改进算法无法减小其复杂度，对提升性能没有太大的作用。

### 算法步骤
* 比较相邻的元素，如果序列靠前的较大，就交换他们
* 按顺序对每一对相邻的元素执行相同的工作，直到最后一轮，这部完成后，最后的元素就是最大的数
* 除最后一个元素，对其他元素重复以上步骤
* 持续对越来越少的未完成排序的元素重复上面的步骤，知道没有一对元素需要比较

### 动图演示

![](https://github.com/hustcc/JS-Sorting-Algorithm/raw/master/res/bubbleSort.gif)

### 代码实现
```js
function bubbleSort (arr) {
    let len = arr.length
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}

```

### 复杂度分析
冒泡在正序时最快，逆序时最慢，算法复杂度为O(n^2)

## 选择排序
选择排序（Selection Sort）是一种简单直观的排序算法，无论什么数据进去，都是相同的O(n^2)的复杂度，数据规模越小越好，但是不会增大空间复杂度

### 算法步骤
* 在未排序的序列中找到最小的元素，放在排序序列的起始位置
* 从剩余未排序的元素中寻找最小元素，放在已排序序列的末尾
* 重复第二步，直到所有元素均排序完成

### 动图演示
![](https://github.com/hustcc/JS-Sorting-Algorithm/raw/master/res/selectionSort.gif)

### 代码实现
```js
function selectionSort(arr){
    let len = arr.length
    let minIndex, temp
    for(let i = 0;i<len-1;i++){
        minIndex = i
        for(let j = i+1;j<len;j++){
            if(arr[j]<arr[minIndex]){
                minIndex = j
            }
        }
        temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
    }
    return arr
}

console.log(selectionSort([1,2,1,5,4]))
```

### 复杂度分析
无好坏情况，都是O(n^2)

## 插入排序
插入排序和打扑克排的操作很类似，通过构建有序序列，从后向前扫描已排序的序列，将未排序的序列依次插入相应的位置

插入算法有一种优化算法，**拆半插入**

### 算法步骤
* 将待排序序列的第一个元素看作一个有序序列，将其余元素看作待排序序列
* 从头到尾扫描未排序序列，将扫描到的每个元素插入到有序序列的适当位置，如果待插入的元素和某个有序序列的元素相等，则直接将待插入元素放到相等元素的后面

### 动图演示
![](https://github.com/hustcc/JS-Sorting-Algorithm/raw/master/res/insertionSort.gif)

### 代码实现
```js
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
```

### 复杂度分析
O(n^2),最好情况是O(n)

## 希尔排序
希尔排序，也称缩小增量排序算法，是插入排序的一种更高效的改进版本，同时也是冲破O(n^2)的第一批算法。但希尔排序是非稳定排序算法。插入排序对几乎已经排好的序列很高效，几乎可以达到线性复杂度；但是对于一般的序列是低效的，因为插入排序每次只能将数据移动一位。

希尔排序的思想是：先将整个待排序列分割成若干子序列分别直接插入序列，待整个序列中记录基本有序时再对全部记录依次直接插入排序，

### 算法步骤
* 选择一个增量序列（t1,t2....,tk）,其中ti>tj,tk=1
* 按照增量序列的个数k，对序列进行k趟排序
* 每趟排序，根据对应的增量ti,将待排序序列分割成若干长度为m的子序列，分别对各个子表进行直接插入排序，仅增量因子为1时，整个序列作为一个表来处理，表长度即为整个序列的长度

在此我们选择增量gap=length/2，缩小增量继续以gap = gap/2的方式，这种增量选择我们可以用一个序列来表示，{n/2,(n/2)/2...1}，称为**增量序列**。希尔排序的增量序列的选择与证明是个数学难题，我们选择的这个增量序列是比较常用的，也是希尔建议的增量，称为希尔增量，但其实这个增量序列不是最优的。

### 代码实现
```js
function shellSort(arr) {
    let len = arr.length,temp,gap = 1
    // 定义间隔序列，相当于一共len/3组，每组包含3个元素
    while(gap<len/3){
        gap = gap*3+1
    }
    // 减少间隔，直到间隔gap为1，此时的快排就是已经大概完成的
    for(gap;gap>0;gap=Math.floor(gap/3)){
        // 插入排序的实现，间隔是gap
        for(var i = gap;i<len;i++){
            temp = arr[i]
            for(var j = i-gap;j>=0&&arr[j]>temp;j-=gap){
                arr[j+gap]=arr[j]
            }
            arr[j+gap]=temp
        }
    }
    return arr
}

console.log(shellSort([1,3,4,1]))
```
### 复杂度分析
希尔排序中对于增量序列的选择十分重要，直接影响到希尔排序的性能。我们上面选择的增量序列{n/2,(n/2)/2...1}(希尔增量)，其最坏时间复杂度依然为O(n^2)，一些经过优化的增量序列如Hibbard经过复杂证明可使得最坏时间复杂度为O(n^3/2)。

## 归并排序
归并排序（Merge Sort）是建立在归并操作上的一种有效的排序算法，是采用分治法（Divide and Conquer）的一个非常典型的应用

作为一种典型的分而治之思想的算法应用，归并排序的实现由两种方法：
* 自上而下的递归，所有递归的方法都可以使用迭代重写
* 自下而上的迭代

在《数据结构与算法JavaScript描述》中，作者认为：
> However,it is not possible to do so in Javascript,as the recursion goes too deep for the language to handle.(这种递归深度对js而言，还是太深了)

归并排序和选择排序一样，不受输入数据的影响，但是其时间复杂度却好得多，其时间复杂度都是O(nlogn)的时间复杂度，但是需要额外的空间复杂度

**如何将两个有序序列合并呢**，只要比较两个序列的第一个数，谁小就先取谁，并将该数字从对应的序列中删除。再进行比较，如果一个序列为空了，那就直接将另一个依次取出即可（这里适合使用while循环）。合并有序序列的复杂度可以达到O(n)

归并排序的就是递归的分出小组，当分出的小组只有一个数据时，就可以认为这个小组内部已经达到了有序。这种通过先递归分解序列，再合并序列就完成的归并排序。

### 算法步骤
* 申请空间，使得其大小为两个已排序序列之和，该空间用来存放合并后的序列
* 设定两个指针，初始位置分别为两个已经排序序列的其实位置
* 比较两个指针指向的元素，选择相对较小的放入合并区间，并移动指针到下一位置
* 重复步骤三，直到某一指针达到序列尾
* 将另一序列剩下的所有元素直接复制到合并序列尾

### 动图演示
![](https://github.com/hustcc/JS-Sorting-Algorithm/raw/master/res/mergeSort.gif)

### 代码实现
```js
function mergeSort(arr){
    let len = arr.length
    if(len<2){
        return arr
    }
    var middle = Math.floor(len/2),
    left=arr.slice(0,middle),
    right=arr.slice(middle)
    return merge(mergeSort(left),mergeSort(right))
}

function merge(left,right){
    var result = []
    while(left.length && right.length){
        if(left[0]<=right[0]){
            result.push(left.shift())
        }else{
            result.push(right.shift())
        }
    }
    while(left.length){
        result.push(left.shift())
    }
    while(right.length){
        result.push(right.shift())
    }

    return result
}

console.log(mergeSort([4,3,2,1,7,6,4,2]))
```

### 复杂度分析
归并的排序的效率较高，长度为n的序列，完全分开需要log(n)步，每一步都是一个合并有序序列的过程，复杂度为O(n),中的时间复杂度为O(n*log(n))。归并排序每次都是在相邻的数据上进行操作，故其在相同复杂度下的几种排序算法（快排，归并，希尔，堆）中，也是效率比较高的

## 快速排序
快排是东尼·霍尔搞出来的一种算法，平均情况下需要O(nlog(n))次比较，Worst Case的时间复杂度达到了O(n^2)，这种情况很少见，实际上快排通常比其他O(nlog(n))的算法更快。
> 快排最坏的情况是O(n^2)，比如顺序序列的快排。但是他的平摊期望时间是O(nlog(n))，且记号中隐含的常数因子很小，比稳定复杂度为O(nlong(n))的归并排序要小很多。所以，对于绝大多数顺序性较弱的随机序列而言，快排总是优于归并排序

快排又是一种使用分而治之（Devide and Conquer）策略的算法，从本质上讲快排是在冒泡排序的基础上的递归分治法。

### 算法步骤
* 从序列中挑出一个元素，称为“基准”（pivot）
* 重新排序序列，所有元素比基准小的放在基准前面，比基准大的放在基准后面，该基准就处于数列的中间位置，这个称为分区（partition）操作
* 递归地（recursive）把小于基准元素的子列和大于基准元素的子列进行排序

递归的最底部情形是序列的大小为零或者为1，也就是说永远都已经被排好序了。虽然一直递归下去，但是这个算法总会退出。因为每次迭代（iteration）中，都至少把一个元素排到它最后的位置去

快排的每一轮的处理其实就是将这一轮的基准数归位，直到所有的数归位排序就结束了
**至于哨兵是从左边还是从右边开始，关键是出现两个哨兵相遇，且该相遇点的值大于基准点的值**

### 动图演示
![](https://github.com/hustcc/JS-Sorting-Algorithm/raw/master/res/quickSort.gif)

### 代码实现
```js
function quickSort (arr, left, right) {
    var len = arr.length,
        partitionIndex,
        left = typeof left != 'number' ? 0 : left,
        right = typeof right != 'number' ? len - 1 : right

    if (left < right) {
        partitionIndex = partition(arr, left, right)
        quickSort(arr, left, partitionIndex - 1)
        quickSort(arr, partitionIndex + 1, right)
    }
    return arr
}

function partition (arr, left, right) {
    var pivot = left, index = pivot + 1
    for (var i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index)
            index++
        }
    }
    swap(arr, pivot, index - 1)
    return index - 1
}

function swap (arr, i, j) {
    var temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

function partition2 (arr, low, high) {
    let pivot = arr[low]
    while (low < high) {
        while (low < high && arr[high] > pivot) {
            high--
        }
        arr[low] = arr[high]
        while (low < high && arr[low] <= pivot) {
            ++low
        }
        arr[high] = arr[low]
    }
    arr[low] = pivot
    return low
}

function quickSort2 (arr, low, high) {
    if (low < high) {
        let pivot = partition2(arr, low, high)
        quickSort2(arr, low, pivot - 1)
        quickSort2(arr, pivot + 1, high)
    }
    return arr
}

console.log(quickSort2([6, 1, 2, 5, 4, 3, 9, 7, 10, 8], 0, 9))


```

### 复杂度分析
快排之所以会快，因为相比冒泡排序，每次交换都是跳跃式的，每次排序的时候设置一个基准点，小于基准点的全部移动到左边，大于基准点的全部在右边，这样每次交换的时候不会像冒泡那样每次只能在相邻的数字之间进行交换，交换的距离就大了。总的比较和交换次数就少了，速度就提高了，当然最坏的情况是相邻的两个数进行交换。因此时间复杂度最差为O(n^2)，平均O(nlog(n))。
快排基于二分的思想，其算法复杂度可以结合二分思想分析。

[坐在马桶上看算法：快速排序](http://blog.csdn.net/vayne_xiao/article/details/53508973)

## 堆排序
堆排序（HeapSort）是指利用堆这种数据结构设计的一种排序算法。堆是一个近似完全二叉树的结构，并同时满足堆的性质：子节点的键值或者索引总是小于（大于）其父节点。堆排序是利用堆的概念来排序的选择排序。分为两种：
* 大顶堆：每个节点的值都大于或者等于其子节点的值，在堆排序算法中用于升序排列
* 小顶堆：每个节点的值都小于或者等于其子节点的值，在堆排序算法中用于降序排列

### 算法步骤

将待排序的序列构建成一个堆，根据升序（大顶堆）降序（小顶堆）选择堆的类型。构造堆完成完成后，最大的元素已经到达堆顶，将最大元素与末尾元素交换，将最大的元素沉到数组末端。重新调整堆结构，使得其满足堆的定义，然后继续交换堆顶元素与当前的末尾元素，反复执行调整和交换步骤，直到整个序列有序。
**关键是一个堆的创建过程，如何如何确定堆的位置和序列下标的关系**

* 创建一个堆H[0...n-1]，需要满足堆的定义
* 将堆首（最大值）和堆尾互换
* 把堆的尺寸缩小1，并调用shift_down(0)，重新调整堆的结构
* 重复步骤2，直到堆的尺寸为1

### 动图演示
![](https://github.com/hustcc/JS-Sorting-Algorithm/raw/master/res/heapSort.gif)

### 代码实现
```js
let len

function buildMaxHeap (arr) {
    len = arr.length
    for (var i = Math.floor(len / 2); i >= 0; i--) {
        heapify(arr, i)
    }
}

// 堆调整
function heapify (arr, i) {
    var left = 2 * i + 1
    var right = 2 * i + 2
    var largest = i

    if (left < len && arr[left] > arr[largest]) {
        largest = left
    }
    if (right < len && arr[right] > arr[largest]) {
        largest = right
    }
    if (largest != i) {
        swap(arr, i, largest)
        heapify(arr, largest)
    }
}

function swap (arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j]
    arr[j] = temp
}

// 交换堆顶和最后一个
function heapSort (arr) {
    buildMaxHeap(arr)

    for (var i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i)
        len--
        heapify(arr, 0)
    }
    return arr
}

console.log(heapSort([6,4,3,2,1,6,7,89,2,3]))
```

### 复杂度分析

堆排序是一种选择排序，整体主要由**构建初始堆**和**交换堆顶与末尾元素并重建堆**两部分组成。其中构建初始堆经推到复杂度为O(n)，在交换并重建堆的过程中，需要交换n-1次，而重建堆的过程中，根据完全二叉树的性质，(log2(n-1),log2(n-2)...1)，逐步递减，近似为nlogn，所以堆排序的时间复杂度一般认为是O(nlog(n))级。

## 计数排序
计数排序的核心在与将输入的数据值转换为键存储在额外开辟的数组空间中。作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有范围的整数

该算法是一个不需要比较的，类似桶排序的线性时间排序算法。该算法对已知数量范围的数组进行排序。

**计数排序的核心思想是，构建一个足够大的数组 hashArray[]，数组大小需要保证能够把所有元素都包含在这个数组上 。**

### 算法步骤

* 对已知最大最小值的需要排序的序列A，先创建另外一个数组C，长度为最大值与最小值的间隔。
* 扫描一趟A，得到A中的各个元素的总数，将各个元素的总数保存到C对应的单元中。即数组C是A的元素为下标，以A中各个元素的个数为值的数组。
* 将C中的记录按照每个元素的计数展开到待排序数组中，排序就完成了

### 动图演示
![](https://github.com/hustcc/JS-Sorting-Algorithm/raw/master/res/countingSort.gif)

### 代码实现
```js
function countingSort (arr, maxValue) {
    var bucket = new Array(maxValue + 1),
        sortedIndex = 0,
        arrLen = arr.length,
        bucketLen = maxValue + 1
    for(var i = 0;i<arrLen;i++){
        if(!bucket[arr[i]]){
            bucket[arr[i]]=0
        }
        bucket[arr[i]]++
    }

    for(var j =0;j<bucketLen;j++){
        while (bucket[j]>0){
            arr[sortedIndex++]=j
            bucket[j]--
        }
    }
    return arr
}

console.log(countingSort([7,6,5,4,3,2,11,112],112))
```

### 复杂度分析
这种排序需要一个辅助数组实现，不基于比较，算法复杂度为O(n)，但是由于需要一个辅助数组C，空间复杂度会变大

## 桶排序
有说法桶排序（bucketSort）是计数排序的升级版，利用了函数的映射关系，高效与否就是看这个映射函数的确定。为了使桶排序更加高效，有两点需确认：
* 在额外空间充足的情况下，尽量增大桶的数量
* 使用映射函数能够将输入的N个数据均匀的分配到K个桶中

### 代码实现
```js
function bucketSort(arr, bucketSize) {
    if (arr.length === 0) {
      return arr;
    }

    var i;
    var minValue = arr[0];
    var maxValue = arr[0];
    for (i = 1; i < arr.length; i++) {
      if (arr[i] < minValue) {
          minValue = arr[i];                // 输入数据的最小值
      } else if (arr[i] > maxValue) {
          maxValue = arr[i];                // 输入数据的最大值
      }
    }

    //桶的初始化
    var DEFAULT_BUCKET_SIZE = 5;            // 设置桶的默认数量为5
    bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
    var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;   
    var buckets = new Array(bucketCount);
    for (i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    //利用映射函数将数据分配到各个桶中
    for (i = 0; i < arr.length; i++) {
        buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
    }

    arr.length = 0;
    for (i = 0; i < buckets.length; i++) {
        insertionSort(buckets[i]);                      // 对每个桶进行排序，这里使用了插入排序
        for (var j = 0; j < buckets[i].length; j++) {
            arr.push(buckets[i][j]);                      
        }
    }

    return arr;
}
```

### 复杂度分析
同时，对于桶中元素的排序，选择何种比较排序算法对性能依然重要

### 基数排序
基数排序是一种非比较型整数排序算法，将整数按位数分割成不同的数字，然后按照每个位数进行比较。由于整数也可以表示字符串（名字日期）和特定的浮点数，因此基数排序也不是只能用于整数

对比三种非比较型的算法，三种算法都利用了桶的概念，但是对桶的使用有些差异。
* 基数排序：根据键值的每位数字来分配桶
* 计数排序：每个桶只存储单一键值；
* 桶排序：每个桶存储一定范围的数值；

### 动图演示
![](https://github.com/hustcc/JS-Sorting-Algorithm/blob/master/res/radixSort.gif)

### 代码实现

```js
//LSD Radix Sort
var counter = [];
function radixSort(arr, maxDigit) {
    var mod = 10;
    var dev = 1;
    for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for(var j = 0; j < arr.length; j++) {
            var bucket = parseInt((arr[j] % mod) / dev);
            if(counter[bucket]==null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        var pos = 0;
        for(var j = 0; j < counter.length; j++) {
            var value = null;
            if(counter[j]!=null) {
                while ((value = counter[j].shift()) != null) {
                      arr[pos++] = value;
                }
          }
        }
    }
    return arr;
}
```


### 复杂度分析