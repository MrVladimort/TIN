const studentProtoInit = Student.prototype = {
    listaPrzedmiotow: []
};

Student.prototype.listaPrzedmiotow = ['AVC', 'TUR', 'GRK'];

console.log(studentProtoInit);

// TODO Object.create()

console.log(studentProtoInit);
