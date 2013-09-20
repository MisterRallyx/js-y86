function assemble(rawStr) {
	var objectStr = [],
		st = {},
		lines = rawString.split("\n");
		
	lines = symbolTable(lines, st);
	for (i in lines) {
		var line = lines[i].trim(),
			inst = instruction(line, st);
		objectStr.push(inst); 
	}

	return objectStr.join("\n");
}

function symbolTable(lines, st) {
	var symbol = /^\w+:/;
	for(i in lines) {
		var line = lines[i];
		if (symbol.test(line)) {
			var s = symbol.match(line);
			st[s] = i;
		}
	}
}

var ASSEM = [];

ASSEM[0] = function () {
	return '00';
};

ASSEM[1] = function () {
	return '10';
};

ASSEM[2] = function () {
	return '20' + this.rA + this.rB;
};

ASSEM[3] = function () {
	return '30f' + this.rB + this.V;
};

ASSEM[4] = function () {
	return '40' + this.rA + this.rB + this.D;
};

ASSEM[5] = function () {
	return '50' + this.rA + this.rB + this.D;
};

ASSEM[6] = function () {
	return '6' + this.fn + this.rA + this.rB;
};

ASSEM[7] = function () {
	return '7' + this.fn + this.Dest;
};

ASSEM[8] = function () {
	return '80' + this.Dest;
};

ASSEM[9] = function () {
	return '90';
};

ASSEM[10] = function () {
	return 'a0' + this.rA + 'f';
};

ASSEM[11] = function () {
	return 'b0' + this.rA + 'f';
};
