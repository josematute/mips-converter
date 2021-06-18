class Instruction {
	constructor(name, desc, format, fomat_length, opcode, func) {
		this.name = name
		this.desc = desc
		this.format = format
		this.fomat_length = fomat_length
		this.opcode = opcode
		this.func = func
	}
}

const instructions = {
	// R-Type
	add: new Instruction("add", "Add (with overflow)", "rd, rs, rt", 3, "000000", "100000"),
	addu: new Instruction("addu", "", "", 0, "000000", "100001"),
	and: new Instruction("and", "", "", 0, "000000", "100100"),
	break: new Instruction("break", "", "", 0, "000000", "001101"),
	div: new Instruction("div", "", "", 0, "000000", "011010"),
	divu: new Instruction("divu", "", "", 0, "000000", "011011"),
	jalr: new Instruction("jalr", "", "", 0, "000000", "001001"),
	jr: new Instruction("jr", "", "", 0, "000000", "001000"),
	mfhi: new Instruction("mfhi", "", "", 0, "000000", "010000"),
	mflo: new Instruction("mflo", "", "", 0, "000000", "010010"),
	mthi: new Instruction("mthi", "", "", 0, "000000", "010001"),
	mtlo: new Instruction("mtlo", "", "", 0, "000000", "010011"),
	mult: new Instruction("mult", "", "", 0, "000000", "011000"),
	multu: new Instruction("multu", "", "", 0, "000000", "011001"),
	nor: new Instruction("nor", "", "", 0, "000000", "100111"),
	or: new Instruction("or", "", "", 0, "000000", "100101"),
	sll: new Instruction("sll", "", "", 0, "000000", "000000"),
	sllv: new Instruction("sllv", "", "", 0, "000000", "000100"),
	slt: new Instruction("slt", "", 0, "000000", "101010"),
	sltu: new Instruction("sltu", "", "", 0, "000000", "101011"),
	sra: new Instruction("sra", "", "", 0, "000000", "000011"),
	srav: new Instruction("srav", "", "", 0, "000000", "000111"),
	srl: new Instruction("srl", "", "", 0, "000000", "000010"),
	srlv: new Instruction("srlv", "", "", 0, "000000", "000110"),
	sub: new Instruction("sub", "", "", 0, "000000", "100010"),
	subu: new Instruction("subu", "", "", 0, "000000", "100011"),
	syscall: new Instruction("syscall", "", "", 0, "000000", "001100"),
	xor: new Instruction("xor", "", "", 0, "000000", "100110"),
	// I-Type
	addi: new Instruction("addi", "", "", 0, "001000", null),
	addiu: new Instruction("addiu", "", "", 0, "001001", null),
	andi: new Instruction("andi", "", "", 0, "001100", null),
	beq: new Instruction("beq", "", "", 0, "000100", null),
	bgez: new Instruction("bgez", "", "", 0, "000001", null),
	bgtz: new Instruction("bgtz", "", "", 0, "000111", null),
	blez: new Instruction("blez", "", "", 0, "000110", null),
	bltz: new Instruction("bltz", "", "", 0, "000011", null),
	bne: new Instruction("bne", "", "", 0, "000101", null),
	lb: new Instruction("lb", "", "", 0, "100000", null),
	lbu: new Instruction("lbu", "", "", 0, "100100", null),
	lh: new Instruction("lh", "", "", 0, "100001", null),
	lhu: new Instruction("lhu", "", "", 0, "100101", null),
	lui: new Instruction("lui", "", "", 0, "001111", null),
	lw: new Instruction("lw", "", "", 0, "100011", null),
	lwc1: new Instruction("lwc1", "", "", 0, "110001", null),
	ori: new Instruction("ori", "", "", 0, "001101", null),
	sb: new Instruction("sb", "", "", 0, "101000", null),
	slti: new Instruction("slti", "", "", 0, "001010", null),
	sltiu: new Instruction("sltiu", "", "", 0, "001011", null),
	sh: new Instruction("sh", "", "", 0, "101001", null),
	sw: new Instruction("sw", "", "", 0, "101011", null),
	swc1: new Instruction("swc1", "", "", 0, "11101", null),
	xori: new Instruction("xori", "", "", 0, "001110", null),
	// J-Type
	j: new Instruction("j", "", "", 0, "000010", null),
	jal: new Instruction("jal", "", "", 0, "000011", null)
}
