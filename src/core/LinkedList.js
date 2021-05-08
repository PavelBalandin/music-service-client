import Node from "./Node";

export default class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    prepend(value) {
        const newNode = new Node(value, this.head);

        if (this.head) this.head.previous = newNode;  // Если есть head, то он больше не будет head.

        this.head = newNode; // Переназначаем head на новый узел

        if (!this.tail) this.tail = newNode; // Если ещё нет tail, делаем новый узел tail.
    }

    append(value) {
        const newNode = new Node(value, null, this.tail);

        if (this.tail) this.tail.next = newNode; // Если есть tail, то он больше не будет tail.

        this.tail = newNode; // Переназначаем tail на новый узел.

        if (!this.head) this.head = newNode; // Если ещё нет head, делаем новый узел head.
    }

    find(value) {

        if (!this.head) return null; // Если нет head - список пуст.

        let currentNode = this.head;

        // Перебираем все узлы в поиске значения.
        while (currentNode) {
            if (value !== undefined && currentNode.value === value)
                return currentNode;

            currentNode = currentNode.next;
        }

        return null;
    }

    delete(value) {
        // Если нет head значит список пуст.
        if (!this.head) {
            return null;
        }

        let deletedNode = null;
        let currentNode = this.head;

        // Перебираем все узлы и удаляем их, если их значение равно указанному.
        while (currentNode) {
            if (currentNode.value === value) {
                // Сохраняем значение текущего узла как удаленное.
                deletedNode = currentNode;

                // Если head должен быть удален,
                if (deletedNode === this.head) {
                    // то делаем следующий узел новым head
                    this.head = deletedNode.next;

                    // Меняем в новом head ссылку (previous) на null.
                    if (this.head) {
                        this.head.previous = null;
                    }

                    // Если все узлы в списке имеют одинаковое значение,
                    // которое передается в качестве аргумента,
                    // тогда все узлы будут удалены. Поэтому tail необходимо обновить.
                    if (deletedNode === this.tail) {
                        this.tail = null;
                    }
                } else if (deletedNode === this.tail) {
                    // Если tail должен быть удален, -
                    // меняем tail на предпоследний узел, который станет новым хвостом.
                    this.tail = deletedNode.previous;
                    // Обновляем ссылку next в новом хвосте.
                    this.tail.next = null;
                } else {
                    // Если средний узел будет удален, -
                    // сохраняем ссылку на предыдущий элемент,
                    const previousNode = deletedNode.previous;
                    // и сохраняем ссылку на следующий элемент.
                    const nextNode = deletedNode.next;
                    // Меняем ссылки у предыдущего и следующего узлов от удаленного узла,
                    // чтобы они больше не ссылались на удаленный узел.
                    previousNode.next = nextNode;
                    nextNode.previous = previousNode;
                }
            }

            // Перематываем на один узел вперёд.
            currentNode = currentNode.next;
        }

        return deletedNode;
    }

    deleteTail() {
        if (!this.tail) return null; // Если нет tail - список пуст.

        const deletedTail = this.tail; // Сохраняем значение последнего узла.

        // Если у tail есть ссылка на предыдущий узел,
        if (this.tail.previous) {
            this.tail = this.tail.previous;  // переназначаем tail на предыдущий узел,
            this.tail.next = null; // обновляем ссылку на следующий узел.
        } else {
            // Если есть tail, но у него нет ссылки на предыдущий узел,
            // значит в списке только один узел и мы его удалили.
            // Поэтому обнуляем всё.
            this.head = null;
            this.tail = null;
        }

        return deletedTail;
    }

    deleteHead() {
        if (!this.head) return null; // Если нет head - список пуст.

        const deletedHead = this.head; // Сохраняем значение первого узла.

        // Если у head есть ссылка на следующий узел,
        if (this.head.next) {
            this.head = this.head.next; // переназначаем head на следующий узел,
            this.head.previous = null; // обновляем ссылку на следующий узел.
        } else {
            // Если есть head, но у него нет ссылки на следующий узел,
            // значит в списке только один узел и мы его удалили.
            // Поэтому обнуляем всё.
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    fromArray(values) {
        values.forEach(value => this.append(value));

        return this;
    }

    toArray() {
        const nodes = [];

        let currentNode = this.head;

        // Перебираем все узлы и добавляем в массив.
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    toString(callback) {
        // Сначала создаём массив из всех узлов.
        return this.toArray()
            // На каждом узле вызываем метод toString,
            // что бы получить значение в виде строки.
            .map(node => node.toString(callback))
            // Вызываем метод toString на массиве строк.
            .toString();
    }

    reverse() {
        let currNode = this.head;
        let prevNode = null;
        let nextNode = null;

        // Перебираем все узлы.
        while (currNode) {
            // Сохраняем предыдущий и следующий узлы.
            nextNode = currNode.next;
            prevNode = currNode.previous;

            // Меняем ссылку на следующий "next" узел текущего узла,
            // чтобы он ссылался на предыдущий узел.
            // Так как мы меняем их местами, нужно поменять и ссылки на узлы.
            // Изначально, первый узел не имеет предыдущего узла,
            // поэтому после перестановки его "next" станет "null".
            currNode.next = prevNode;

            // Меняем ссылку на предыдущий "previous" узел текущего узла,
            currNode.previous = nextNode;

            // Перемещаем узлы prevNode и currNode на один шаг вперед.

            // Текущий узел делаем предыдущим.
            prevNode = currNode;

            // Следующий узел становится текущим.
            currNode = nextNode;
        }

        // Меняем head и tail местами.
        this.tail = this.head;

        // В данном случае prevNode это последний узел,
        // поэтому, после reverse, он становится первым.
        this.head = prevNode;

        // Возвращаем список.
        return this;
    }


}