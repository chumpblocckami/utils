
import * as tf from '@tensorflow/tfjs';

const TOP_K = 10

const argsort = (arr) => arr.map((a) => a.map((v, i) => [v, i]).sort().map(a => a[1]))

const fliplr = (arr) => arr.map((a) => a.reverse())

const findMatches = (array, container) => array.map((matches) => matches.map((id) => container[0]["label"][id]))

const mode = array => array.map((arr) => {
    const mode = {};
    let max = 0, count = 0;

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];

        if (mode[item]) {
            mode[item]++;
        } else {
            mode[item] = 1;
        }

        if (count < mode[item]) {
            max = item;
            count = mode[item];
        }
    }

    return max;
})

async function getLabel(embeddings: Array<Int16Array>, dataset: DatasetEmbeddings[]): Promise<number[]> {
    var labels = []
    for (let i = 0; i < embeddings.length; i++) {
        //similarity matrix
        let similarityMatrix = tf.tensor(embeddings).matMul(this.dataset[0].embedding);
        let similarityMatrixArray = await similarityMatrix.array()

        //sort and flip index
        let sortedArray = argsort(similarityMatrixArray)
        let reversedSortedArray = fliplr(sortedArray)

        //get top 10 best match
        let bestMatch = reversedSortedArray.slice(0, TOP_K)
        let idsBestMatch = findMatches(bestMatch, this.dataset)

        //calculate mode for single embedding
        let label = mode(idsBestMatch)
        this.logger.log(`Label associated to frame ${i} is: ${label}`)
        labels.push(label)
    }
    //get final label
    const finalOuput = mode([labels])
    this.logger.log(`Label associated to timestamp has label ${finalOuput}`)
    return finalOuput
}

class DatasetEmbeddings {
    embedding: tf.Tensor
    label: Array<number>
}
let dataset: DatasetEmbeddings[] = []
dataset.push({
    embedding: tf.transpose(tf.randomNormal([10, 100])),
    label: Array.from({ length: 100 }, () => Math.floor(Math.random() * 100))
})

const embeddings = tf.transpose(tf.randomNormal([10, 100]))

getLabel(embeddings, dataset)