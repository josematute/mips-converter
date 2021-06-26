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
	bltz: new Instruction("bltz", "Branch on less than zero", "rs, label", 2, "000001", null),
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
	swc1: new Instruction("swc1", "Store word coprocessor 1", "rt, immediate(rs)", 2, "111001", null),
	xori: new Instruction("xori", "Bitwise exclusive or immediate", "rt, rs, immediate", 3, "001110", null),
	// J-Type
	j: new Instruction("j", "Jump", "label", 1, "000010", null),
	jal: new Instruction("jal", "Jump and link", "label", 1, "000011", null)
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
	"10100": "s4",
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
	"s4": "10100",
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
	hex: "^[A-Fa-f0-9]+$",
	register_imm: "^[0-9]+\\((zero|at|gp|sp|fp|ra|v[01]|a[0-3]|t[0-9]|s[0-7]|k[01])\\)$"
}

$("#convert-btn").click(() => {
	checkInstruction($("#instruction").val())
})

function checkInstruction(input) {
	hideOldInfo()

	input = input.trim().toLowerCase()
	if (input.length === 0) return

	const inputArray = input.split(" ") // the instruction converted to an array of the user, splitted by a space
	const instr = inputArray[0] // the instruction of the user's instruction
	if (!(instr in instructions)) {
		displayAlert(`${instr} is not a valid instruction.`)
	} else {
		const format = instructions[instr].format // the format of the instruction the user inputted
		const formatLength = instructions[instr].format_length // the length of the format of the instruction the user inputted
		const formatArray = format.split(",") // an array with all the elements in the format the user inputted
		const formatArrayNoSpaces = formatArrayWithoutSpaces(formatArray)
		if (inputArray.length - 1 !== formatLength) {
			displayAlert(`The instruction's format length is not correct. The format is: '${instr} ${formatArrayNoSpaces}'`)
		} else {
			let formatError = false

			const inputArrayFormatOnly = inputArray.slice(1) // an array of the user's input without the instruction (just the format)
			formatArray.forEach((el, index) => {
				el = el.trim()
				let currentElement = inputArrayFormatOnly[index]
				// if element is a register
				if (el === "rd" || el === "rs" || el === "rt") {
					if (!isValidFormatElement(currentElement, regexes["registers"])) {
						displayAlert(`${currentElement} is not a register. The format is: '${instr} ${formatArrayNoSpaces}'`)
						formatError = true
					}
				}
				// if element is a sa
				else if (el === "sa") {
					if (isNaN(currentElement)) {
						displayAlert(`${currentElement} is not a number. The format is: '${instr} ${formatArrayNoSpaces}'`)
						formatError = true
					} else if (!isShiftAddressRangeValid(parseInt(currentElement, 10))) {
						displayAlert(
							`${currentElement} is either less than 0 or more than 31. A shift address can only be within the range of, and including, 0 and 31.`
						)
						formatError = true
					}
				}
				// if element is an immediate
				else if (el === "immediate") {
					if (isNaN(currentElement)) {
						displayAlert(`${currentElement} is not a number. The format is: '${instr} ${formatArrayNoSpaces}'`)
						formatError = true
					} else if (!isImmediateRangeValid(parseInt(currentElement, 10))) {
						displayAlert(
							`${currentElement} is either less than 0 or more than 65,535. An immediate can only be within the range of, and including, 0 and 65,535.`
						)
						formatError = true
					}
				}
				// if element is an hex value
				else if (el === "label") {
					if (!isValidFormatElement(currentElement, regexes["hex"])) {
						displayAlert(`${currentElement} is not a valid hex value. The format is: '${instr} ${formatArrayNoSpaces}', where label is a hex value.`)
						formatError = true
					}
				}
				// if element is in the format immediate(rs)
				else if (el === "immediate(rs)") {
					if (!isValidFormatElement(currentElement, regexes["register_imm"])) {
						displayAlert(`${currentElement} is not a valid 'immediate(rs)' value. Check your input. The format is: '${instr} ${formatArrayNoSpaces}'`)
						formatError = true
					} else {
						const indexOfLeftParentheses = currentElement.indexOf("(")
						const justTheNumber = currentElement.slice(0, indexOfLeftParentheses)
						if (!isImmediateRangeValid(parseInt(justTheNumber, 10))) {
							displayAlert(
								`The immediate(the number) of '${currentElement}' is either less than 0 or more than 65,535. An immediate can only be within the range of, and including, 0 and 65,535.`
							)
							formatError = true
						}
					}
				}
			})

			if (!formatError) {
				convertInstructionToBinary(input, inputArray.slice(1), formatArray, instructions[instr])
			}
		}
	}
}

function formatArrayWithoutSpaces(array) {
	let noSpaces = []
	for (const i of array) {
		noSpaces.push(i.trim())
	}
	return noSpaces.join(" ")
}

function displayAlert(text) {
	$("#message").text(text)
	$("#message").css("display", "block")
}

function hideOldInfo() {
	$("#message").text("")
	$("#message").css("display", "none")
	$("#name").text("")
	$("#desc").text("")
	$("#format").text("")
	$("#p-instruction").text("")
	$("#p-binary").text("")
	$("#p-hex").text("")
	$("#r-type-table").css("display", "none")
	$("#i-type-table").css("display", "none")
	$("#j-type-table").css("display", "none")
}

function isValidFormatElement(element, regexToUse) {
	const regex = new RegExp(regexToUse)
	return regex.test(element)
}

function isImmediateRangeValid(imm) {
	if (imm < 0 || imm > 65535) return false
	return true
}

function isShiftAddressRangeValid(imm) {
	if (imm < 0 || imm > 31) return false
	return true
}

function convertInstructionToBinary(original_input, input_array, format_array, instruction) {
	if (instruction.func != null) {
		// r-type
		let r_type = {
			opcode: "000000",
			rs: "",
			rt: "",
			rd: "",
			sa: "",
			func: instruction.func
		}

		let i = 0 // index
		for (let el of format_array) {
			el = el.trim()
			switch (el) {
				case "rs":
					r_type.rs = registerToBinary[input_array[i]]
					break
				case "rt":
					r_type.rt = registerToBinary[input_array[i]]
					break
				case "rd":
					r_type.rd = registerToBinary[input_array[i]]
					break
				case "sa":
					r_type.sa = decimalToBinary(input_array[i], 5)
					break
			}
			i++
		}

		for (const el in r_type) if (r_type[el] === "") r_type[el] = "00000"

		displayResults("r", r_type, original_input, instruction)
	} else if (instruction.opcode.slice(0, 5) !== "00001") {
		// i-type
		let i_type = {
			opcode: instruction.opcode,
			rs: "",
			rt: "",
			immediate: ""
		}

		let i = 0 // index
		for (let el of format_array) {
			el = el.trim()
			switch (el) {
				case "rs":
					i_type.rs = registerToBinary[input_array[i]]
					break
				case "rt":
					i_type.rt = registerToBinary[input_array[i]]
					break
				case "immediate":
					i_type.immediate = decimalToBinary(input_array[i], 16)
					break
				case "label":
					i_type.immediate = hexToBinary(input_array[i], 16)
					break
				case "immediate(rs)":
					const indexOfLeftParentheses = input_array[i].indexOf("(")
					const theImmediate = input_array[i].slice(0, indexOfLeftParentheses)
					const theRegister = input_array[i].slice(indexOfLeftParentheses + 1, input_array[i].length - 1)
					i_type.rs = registerToBinary[theRegister]
					i_type.immediate = decimalToBinary(theImmediate, 16)
					break
			}
			i++
		}

		if (instruction.name === "bgez") i_type.rt = "00001"
		else if (instruction.name === "bgtz" || instruction.name === "blez" || instruction.name === "bltz") i_type.rt = "00000"
		else if (instruction.name === "lui") i_type.rs = "00000"

		displayResults("i", i_type, original_input, instruction)
	} else {
		// j-type
		let j_type = {
			opcode: instruction.opcode,
			target: hexToBinary(input_array[0], 26)
		}
		displayResults("j", j_type, original_input, instruction)
	}
}

function decimalToBinary(decimal, max) {
	let binary = Number(decimal).toString(2)
	lengthOfBinary = binary.length

	if (lengthOfBinary === max) return binary
	else {
		const difference = max - lengthOfBinary
		if (difference < 0) {
			return `${binary.slice(Math.abs(difference))}`
		} else {
			return `${"0".repeat(difference)}${binary}`
		}
	}
}

function binaryToDecimal(binary) {
	return parseInt(binary, 2).toString(10)
}

function binaryToHex(binary) {
	return parseInt(binary, 2).toString(16).toUpperCase()
}

function hexToBinary(hex, max) {
	return decimalToBinary(parseInt(hex, 16).toString(10), max)
}

function displayResults(type, type_object, instruction_to_display, instruction) {
	if (type === "r") {
		const binaryString = `${type_object.opcode}${type_object.rs}${type_object.rt}${type_object.rd}${type_object.sa}${type_object.func}`
		displayInfoAndConversions(instruction.name, instruction.desc, instruction.format, instruction_to_display, binaryString)

		$("#r-type-table").css("display", "block")
		$("#r-opcode").text(type_object.opcode)
		$("#r-rs").text(type_object.rs)
		$("#r-rt").text(type_object.rt)
		$("#r-rd").text(type_object.rd)
		$("#r-sa").text(type_object.sa)
		$("#r-function").text(type_object.func)
	} else if (type === "i") {
		const binaryString = `${type_object.opcode}${type_object.rs}${type_object.rt}${type_object.immediate}`
		displayInfoAndConversions(instruction.name, instruction.desc, instruction.format, instruction_to_display, binaryString)

		$("#i-type-table").css("display", "block")
		$("#i-opcode").text(type_object.opcode)
		$("#i-rs").text(type_object.rs)
		$("#i-rt").text(type_object.rt)
		$("#i-imm").text(type_object.immediate)
	} else if (type === "j") {
		const binaryString = `${type_object.opcode}${type_object.target}`
		displayInfoAndConversions(instruction.name, instruction.desc, instruction.format, instruction_to_display, binaryString)

		$("#j-type-table").css("display", "block")
		$("#j-opcode").text(type_object.opcode)
		$("#j-target").text(type_object.target)
	}
}

function displayInfoAndConversions(name, desc, format, instruction_to_display, binary_string) {
	$("#name").text(name)
	$("#desc").text(desc)
	$("#format").text(format)
	$("#p-instruction").text(instruction_to_display)
	$("#p-binary").text(binary_string)
	$("#p-hex").text(binaryToHex(binary_string))
}

$("#binary-convert").click(() => {
	checkBinary($("#binary").val())
})

function checkBinary(input, value) {
	hideOldInfo()

	input = input.trim()
	if (input.length === 0) return

	if (input.length < 32 || input.length > 32) {
		displayAlert(`The input is either less or more than 32 characters. It can only be 32 characters long.`)
	} else {
		let wrong_input = false
		for (const number of input) {
			if (number !== "0" && number !== "1") {
				displayAlert(`A binary value can only consist of 0s and 1s.`)
				wrong_input = true
			}
		}
		if (!wrong_input) {
			const opcode = input.slice(0, 6)
			let instruction = ""
			if (opcode === "000000") {
				// r-type
				let r_type = {
					opcode: opcode,
					rs: input.slice(6, 11),
					rt: input.slice(11, 16),
					rd: input.slice(16, 21),
					sa: input.slice(21, 26),
					func: input.slice(26)
				}

				let visited = {
					rs: false,
					rt: false,
					rd: false,
					sa: false
				}

				if (r_type.func in functionToInstruction) {
					const instr = instructions[functionToInstruction[r_type.func]]
					instruction = instr.name + " "
					format = instr.format
					if (format.includes("rs")) {
						format = format.replace("rs", binaryToRegister[r_type.rs])
						visited.rs = true
					}
					if (format.includes("rt")) {
						format = format.replace("rt", binaryToRegister[r_type.rt])
						visited.rt = true
					}
					if (format.includes("rd")) {
						format = format.replace("rd", binaryToRegister[r_type.rd])
						visited.rd = true
					}
					if (format.includes("sa")) {
						format = format.replace("sa", binaryToDecimal(r_type.sa))
						visited.sa = true
					}
					instruction = `${instruction}${formatArrayWithoutSpaces(format.split(","))}`

					for (const el in r_type) {
						if (el === "rs" || el === "rt" || el === "rd" || el === "sa") {
							if (visited[el] == false) {
								if (r_type[el] !== "00000") {
									displayAlert(
										`The attempted value seems to be a '${instr.name}' instruction, but the '${el}' field is not all 0s. Since its value is not used in this instruction, its value should be 00000. If this was a HEX conversion, convert the hex value to binary and double-check your input.`
									)
									wrong_input = true
									break
								}
							}
						}
					}

					if (!wrong_input) displayResults("r", r_type, instruction, instr)
				} else {
					displayAlert("No instruction was associated with the given value.")
					wrong_input = true
				}
			} else if (opcode.slice(0, 5) !== "00001") {
				// i-type
				let i_type = {
					opcode: opcode,
					rs: input.slice(6, 11),
					rt: input.slice(11, 16),
					immediate: input.slice(16)
				}

				if (i_type.opcode in opcodeToInstruction) {
					let instr = instructions[opcodeToInstruction[i_type.opcode]]
					let nameToUse = ""
					if (opcode === "000001") {
						if (i_type.rt === "00001") {
							nameToUse = "bgez"
							instr = instructions[nameToUse]
						} else if (i_type.rt === "00000") {
							nameToUse = "bltz"
							instr = instructions[nameToUse]
						} else {
							displayAlert(
								`The attempted value seems to be an i-type instruction with an opcode of '000001', but the 'rt' field should be either '00000' or '00001'. The opcode only belongs to the instructions bgez and bltz, but their rt's are '00001' and '00000' respectively. If this was a HEX conversion, convert the hex value to binary and double-check your input.`
							)
							wrong_input = true
						}
					} else {
						nameToUse = instr.name
					}

					instruction = nameToUse + " "
					format = instr.format

					if (!wrong_input) {
						if (format.includes("rs")) {
							format = format.replace("rs", binaryToRegister[i_type.rs])
						}
						if (format.includes("rt")) {
							format = format.replace("rt", binaryToRegister[i_type.rt])
						}
						if (format.includes("immediate")) {
							format = format.replace("immediate", binaryToDecimal(i_type.immediate))
						}
						if (format.includes("label")) {
							format = format.replace("label", binaryToHex(i_type.immediate))
						}
						instruction = `${instruction}${formatArrayWithoutSpaces(format.split(","))}`

						if (instr.name === "bgtz" || instr.name === "blez" || instr.name === "bltz") {
							if (i_type["rt"] !== "00000") {
								displayAlert(
									`The attempted value seems to be a '${instr.name}' instruction, but the 'rt' field should be '00000'. If this was a HEX conversion, convert the hex value to binary and double-check your input.`
								)
								wrong_input = true
							}
						} else if (instr.name === "bgez") {
							if (i_type["rt"] !== "00001") {
								displayAlert(
									`The attempted value seems to be a '${instr.name}' instruction, but the 'rt' field should be '00001'. If this was a HEX conversion, convert the hex value to binary and double-check your input.`
								)
								wrong_input = true
							}
						}
					}

					if (!wrong_input) displayResults("i", i_type, instruction, instr)
				} else {
					displayAlert("No instruction was associated with the given value.")
					wrong_input = true
				}
			} else {
				// j-type
				let j_type = {
					opcode: opcode,
					target: input.slice(6)
				}

				if (j_type.opcode in opcodeToInstruction) {
					let instr = instructions[opcodeToInstruction[j_type.opcode]]
					instruction = instr.name + " "
					format = instr.format

					format = format.replace("label", binaryToHex(j_type.target))
					instruction = `${instruction}${format}`

					displayResults("j", j_type, instruction, instr)
				}
			}
		}
	}
}

$("#hex-convert").click(() => {
	checkHex($("#hex").val())
})

function checkHex(input) {
	hideOldInfo()

	input = input.trim()
	if (input.length === 0) return
	let wrong_input = false

	if (!isValidFormatElement(input, regexes["hex"])) {
		displayAlert("The given input is not a correct hexadecimal value. Please double-check your input.")
		wrong_input = true
	}

	if (!wrong_input) checkBinary(hexToBinary(input, 32))
}
