### MIPS Converter

This application is a conversion tool that converts assembly instructions to binary and hexadecimal values, as well as the other way around.

## Description

Basically, there are 3 types of conversions in this app:

1. Instruction => Binary & Hexadecimal
2. Binary => Instruction & Hexadecimal
3. Hexadecimal => Instruction & Binary

This is a helpful tool for any Computer Science student who will definetely have a class that will teach them about the low level Assembly Language and how one is able to encode an instruction into a binary value, as well as to decode a binary value to an instruction.

To enter correct inputs, these are some helpful tips:

# Entering an Instruction

I wanted to make entering an instruction very simple. To enter an instruction:

-  For registers, do not put the dollar sign ($), just type the register itself. For example, instead of '$t1', enter 't1'.
-  For an immediate, enter a number.
-  Please enter only one whitespace between elements. Do 't1 t2 t3', not 't1 t2 t3'.
-  No commas neccessary, just spaces between elements.
-  An instruction like 'addu $s1, $t1, $t2' would be entered in this application like this: 'addu s1 t1 t2'.

# Entering a Binary Value

-  Enter 32 0s and 1s. Just like a real instruction converted to binary, the length of the input should be 32.

# Entering a Hexadecimal Value

-  Value must include only numbers and/or characters from A to F.

## Author

[Jose Matute](https://www.linkedin.com/in/jose-matute-780032214/)

## Acknowledgments

I utilized [this pdf](https://eclass.teicrete.gr/modules/document/file.php/TP286/%CE%92%CE%BF%CE%B7%CE%B8%CE%B7%CF%84%CE%B9%CE%BA%CE%AC%20%CE%B5%CE%B3%CF%87%CE%B5%CE%B9%CF%81%CE%AF%CE%B4%CE%B9%CE%B1/MIPS_Instruction_Coding_With_Hex.pdf) to make this app possible. Credits go to the people who created this pdf.
