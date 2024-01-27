class HashMap {
    constructor(capacity = 16) {
        this.capacity = capacity;
        this.size = 0;
        this._buckets = new Array(capacity);
    }
  
    _hash(key) {
        let hash = 0;
        let string = key.toString();
        for (let i = 0; i < string.length; i++) {
            hash = (hash + string.charCodeAt(i)) % this._buckets.length;
        }
        return hash;
    }
  
    set(key, value) {
        const index = this._hash(key);
        
        //if the bucket doesn't have anything in it, assign it to an empty array
        if (!this._buckets[index]) {
            this._buckets[index] = [];
        }
  
        const bucket = this._buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            //if the value of the key exists it'll be overwritten
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                
                return;
            }
        }
  
        bucket.push([key, value]);
        this.size++;

        //resize the capacity if exceeds its length
        if(this.size / this.capacity >= 0.75) {
            this.resize(this.capacity * 2);
        }
    }

    resize(newCapacity) {
        //store current buckets
        const tempBuckets = this._buckets;
        this.capacity = newCapacity;

        //reset size
        this.size = 0;
        //reset buckets
        this._buckets = new Array(newCapacity);

        tempBuckets.forEach(bucket => {
            //add values back
            if (!!bucket) {
                bucket.forEach(node => {
                    this.set(node[0], node[1]);
                });
            }
        });
    }
  
    get(key) {
        const index = this._hash(key);
        const bucket = this._buckets[index];
        if (!bucket) {
            return undefined;
        }
  
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
  
      return undefined;
    }

    has(key) {
        const index = this._hash(key);
        const bucket = this._buckets[index];

        if (!bucket) return false;

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) return true;
        }
    }
  
    remove(key) {
        const index = this._hash(key);
        let bucket = this._buckets[index];
        if (!bucket) return;
  
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);

                //if it was the only element, reassign it to undefined
                if (bucket.length < 1) bucket = undefined;
                this.size--;

                //resize if the load factor is too low
                if (this.size / this.capacity <= 0.25) this.resize(Math.ceil(this.capacity / 2));
                
                return;
            }
        }
    }

    length() {
        return this.size;
    }

    clear() {
        this.capacity = 16;
        this.size = 0;
        this._buckets = new Array(this.capacity);
    }

    keys() {
        const buckets = this._buckets;
        const allKeys = [];

        buckets.forEach(bucket => {
            if (!!bucket) {
                bucket.forEach(node => {
                    allKeys.push(node[0])
                })
            }
        })

        return allKeys;
    }

    values() {
        const buckets = this._buckets;
        const allValues = [];

        buckets.forEach(bucket => {
            if (!!bucket) {
                bucket.forEach(node => {
                    allValues.push(node[1])
                })
            }
        })

        return allValues;
    }

    entries() {
        const buckets = this._buckets;
        const allEntries = [];

        buckets.forEach(bucket => {
            if (!!bucket) {
                bucket.forEach(node => {
                    allEntries.push(node)
                })
            }
        })

        return allEntries;
    }
}

module.exports = HashMap;