class Instruction {
	constructor(name, desc, format, format_length, opcode, func) {
		this.name = name
		this.desc = desc
		this.format = format
		this.format_length = format_length
		this.opcode = opcode
		this.func = func
	}
}

const instructions = {
	// R-Type
	add: new Instruction("add", "Add (with overflow)", "rd, rs, rt", 3, "000000", "100000"),
	addu: new Instruction("addu", "Add unsigned(no overflow)", "rd, rs, rt", 3, "000000", "100001"),
	and: new Instruction("and", "Bitwise and", "rd, rs, rt", 3, "000000", "100100"),
	break: new Instruction("break", "Break (for debugging)", "", 0, "000000", "001101"),
	div: new Instruction("div", "Divide", "rs, rt", 2, "000000", "011010"),
	divu: new Instruction("divu", "Divide unsigned", "rs, rt", 2, "000000", "011011"),
	jalr: new Instruction("jalr", "Jump and link", "rd, rs", 2, "000000", "001001"),
	jr: new Instruction("jr", "Jump register", "rs", 1, "000000", "001000"),
	mfhi: new Instruction("mfhi", "Move from HI", "rd", 1, "000000", "010000"),
	mflo: new Instruction("mflo", "Move from LO", "rd", 1, "000000", "010010"),
	mthi: new Instruction("mthi", "Move to HI", "rs", 1, "000000", "010001"),
	mtlo: new Instruction("mtlo", "Move to LO", "rs", 1, "000000", "010011"),
	mult: new Instruction("mult", "Multiply", "rs, rt", 2, "000000", "011000"),
	multu: new Instruction("multu", "Multiply unsigned", "rs, rt", 2, "000000", "011001"),
	nor: new Instruction("nor", "Bitwise nor", "rd, rs, rt", 3, "000000", "100111"),
	or: new Instruction("or", "Bitwise or", "rd, rs, rt", 3, "000000", "100101"),
	sll: new Instruction("sll", "Shift left logical", "rd, rt, sa", 3, "000000", "000000"),
	sllv: new Instruction("sllv", "Shift left logical variable", "rd, rt, rs", 3, "000000", "000100"),
	slt: new Instruction("slt", "Set on less than (signed)", "rd, rs, rt", 3, "000000", "101010"),
	sltu: new Instruction("sltu", "Set on less than (unsigned)", "rd, rs, rt", 3, "000000", "101011"),
	sra: new Instruction("sra", "Shift right arithmetic", "rd, rt, sa", 3, "000000", "000011"),
	srav: new Instruction("srav", "Shift right arithmetic variable", "rd, rt, rs", 3, "000000", "000111"),
	srl: new Instruction("srl", "Shift right logical", "rd, rt, sa", 3, "000000", "000010"),
	srlv: new Instruction("srlv", "Shift right logical variable", "rd, rt, rs", 3, "000000", "000110"),
	sub: new Instruction("sub", "Subtract", "rd, rs, rt", 3, "000000", "100010"),
	subu: new Instruction("subu", "Subtract unsigned", "rd, rs, rt", 3, "000000", "100011"),
	syscall: new Instruction("syscall", "System call", "", 0, "000000", "001100"),
	xor: new Instruction("xor", "Bitwise exclusive or", "rd, rs, rt", 3, "000000", "100110"),
	// I-Type
	addi: new Instruction("addi", "Add immediate (with overflow)", "rt, rs, immediate", 3, "001000", null),
	addiu: new Instruction("addiu", "Add immediate unsigned (no overflow)", "rt, rs, immediate", 3, "001001", null),
	andi: new Instruction("andi", "Bitwise and immediate", "rt, rs, immediate", 3, "001100", null),
	beq: new Instruction("beq", "Branch on equal", "rs, rt, label", 3, "000100", null),
	bgez: new Instruction("bgez", "Branch on greater than or equal to zero", "rs, label", 2, "000001", null),
	bgtz: new Instruction("bgtz", "Branch on greater than zero", "rs, label", 2, "000111", null),
	blez: new Instruction("blez", "Branch on less than or equal to zero", "rs, label", 2, "000110", null),
	bltz: new Instruction("bltz", "Branch on less than zero", "rs, label", 2, "000011", null),
	bne: new Instruction("bne", "Branch on not equal", "rs, rt, label", 3, "000101", null),
	lb: new Instruction("lb", "Load byte", "rt, immediate(rs)", 2, "100000", null),
	lbu: new Instruction("lbu", "Load byte unsigned", "rt, immediate(rs)", 2, "100100", null),
	lh: new Instruction("lh", "Load halfword", "rt, immediate(rs)", 2, "100001", null),
	lhu: new Instruction("lhu", "Load halfword unsigned", "rt, immediate(rs)", 2, "100101", null),
	lui: new Instruction("lui", "Load upper immediate", "rt, immediate", 2, "001111", null),
	lw: new Instruction("lw", "Load word", "rt, immediate(rs)", 2, "100011", null),
	lwc1: new Instruction("lwc1", "Load word coprocessor 1", "rt, immediate(rs)", 2, "110001", null),
	ori: new Instruction("ori", "Bitwise or immediate", "rt, rs, immediate", 3, "001101", null),
	sb: new Instruction("sb", "Store byte", "rt, immediate(rs)", 2, "101000", null),
	slti: new Instruction("slti", "Set on less than immediate (signed)", "rt, rs, immediate", 3, "001010", null),
	sltiu: new Instruction("sltiu", "Set on less than immediate (unsigned)", "rt, rs, immediate", 3, "001011", null),
	sh: new Instruction("sh", "Store halfword", "rt, immediate(rs)", 2, "101001", null),
	sw: new Instruction("sw", "Store word", "rt, immediate(rs)", 2, "101011", null),
	swc1: new Instruction("swc1", "Store word coprocessor 1", "rt, immediate(rs)", 2, "11101", null),
	xori: new Instruction("xori", "Bitwise exclusive or immediate", "rt, rs, immediate", 3, "001110", null),
	// J-Type
	j: new Instruction("j", "Jump", "j label", 2, "000010", null),
	jal: new Instruction("jal", "Jump and link", "jal label", 2, "000011", null)
}

const binaryToRegister = {
	"00000": "zero",
	"00001": "at",
	"00010": "v0",
	"00011": "v1",
	"00100": "a0",
	"00101": "a1",
	"00110": "a2",
	"00111": "a3",
	"01000": "t0",
	"01001": "t1",
	"01010": "t2",
	"01011": "t3",
	"01100": "t4",
	"01101": "t5",
	"01110": "t6",
	"01111": "t7",
	"10000": "s0",
	"10001": "s1",
	"10010": "s2",
	"10011": "s3",
	"10000": "s4",
	"10101": "s5",
	"10110": "s6",
	"10111": "s7",
	"11000": "t8",
	"11001": "t9",
	"11010": "k0",
	"11011": "k1",
	"11100": "gp",
	"11101": "sp",
	"11110": "fp",
	"11111": "ra"
}

const registerToBinary = {
	"zero": "00000",
	"at": "00001",
	"v0": "00010",
	"v1": "00011",
	"a0": "00100",
	"a1": "00101",
	"a2": "00110",
	"a3": "00111",
	"t0": "01000",
	"t1": "01001",
	"t2": "01010",
	"t3": "01011",
	"t4": "01100",
	"t5": "01101",
	"t6": "01110",
	"t7": "01111",
	"s0": "10000",
	"s1": "10001",
	"s2": "10010",
	"s3": "10011",
	"s4": "10000",
	"s5": "10101",
	"s6": "10110",
	"s7": "10111",
	"t8": "11000",
	"t9": "11001",
	"k0": "11010",
	"k1": "11011",
	"gp": "11100",
	"sp": "11101",
	"fp": "11110",
	"ra": "11111"
}

const opcodeToInstruction = {
	"001000": "addi",
	"001001": "addiu",
	"001100": "andi",
	"000100": "beq",
	"000001": "bgez",
	"000111": "bgtz",
	"000110": "blez",
	"000001": "bltz",
	"000101": "bne",
	"100000": "lb",
	"100100": "lbu",
	"100001": "lh",
	"100101": "lhu",
	"001111": "lui",
	"100011": "lw",
	"110001": "lwc1",
	"001101": "ori",
	"101000": "sb",
	"001010": "slti",
	"001011": "sltiu",
	"101001": "sh",
	"101011": "sw",
	"111001": "swc1",
	"001110": "xori",
	"000010": "j",
	"000011": "jal"
}

const functionToInstruction = {
	"100000": "add",
	"100001": "addu",
	"100100": "and",
	"001101": "break",
	"011010": "div",
	"011011": "divu",
	"001001": "jalr",
	"001000": "jr",
	"010000": "mfhi",
	"010010": "mflo",
	"010001": "mthi",
	"010011": "mtlo",
	"011000": "mult",
	"011001": "multu",
	"100111": "nor",
	"100101": "or",
	"000000": "sll",
	"000100": "sllv",
	"101010": "slt",
	"101011": "sltu",
	"000011": "sra",
	"000111": "srav",
	"000010": "srl",
	"000110": "srlv",
	"100010": "sub",
	"100011": "subu",
	"001100": "syscall",
	"100110": "xor"
}

const regexes = {
	registers: "^(zero|at|gp|sp|fp|ra|v[01]|a[0-3]|t[0-9]|s[0-7]|k[01])$",
	register_imm: "/^[0-9]+((zero|at|gp|sp|fp|ra|v[01]|a[0-3]|t[0-9]|s[0-7]|k[01]))$/",
	hex: "/^[[:xdigit:]]+$/"
}

// for (const opcode in functionToInstruction) {
// 	console.log(instructions[functionToInstruction[opcode]])
// }

$("#convert-btn").click(() => {
	checkInstruction($("#instruction").val())
})

function checkInstruction(input) {
	const input_array = input.split(" ")
	const instr = input_array[0]
	if (!(instr in instructions)) {
		displayAlert("The instruction is not valid.")
	} else {
		const format = instructions[instr].format
		const formatLength = instructions[instr].format_length
		const format_array = format.split(",")
		const betterFormatArray = []
		if (!(input_array.length - 1 === formatLength)) {
			for (const i of format_array) {
				betterFormatArray.push(i)
			}
			displayAlert(`The instruction's format length is not correct. The format is: ${instr} ${betterFormatArray.join(" ")}`)
		} else {
			let formatError = false
			console.log(format_array)
			const inputArrayFormatOnly = input_array.slice(1)
			format_array.forEach((el, index) => {
				el = el.trim()
				console.log(el)
				if (el === "rd" || el === "rs" || el === "rt") {
					if (!isValidFormatElement(inputArrayFormatOnly[index], regexes["registers"])) {
						displayAlert(`${inputArrayFormatOnly[index]} is not a register.`)
					}
				}
			})
		}
	}
}

function displayAlert(text) {
	$("#message").text(text)
	$("#message").css("display", "block")
}

function isValidFormatElement(element, regexToUse) {
	const regex = new RegExp(regexToUse)
	console.log(regex.test(element))
	return regex.test(element)
}
