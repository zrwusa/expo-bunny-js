import {SinglyLinkedList} from '../../data-structures';

export const findKthLargestCase1 = [[3, 2, 1, 5, 6, 4], 2];
export const findKthLargestCase2 = [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4];
export const findKthLargestCase3 = [[3, 2, 3, 1, 2, 4, 1, 5, 5], 4];
export const findKthLargestCase9 = [[938, 936, 818, 781, 255, 908, 308, 358, 527, 904, 878, 980, 233, 873, 478, 516, 294, 877, 901, 923, 444, 383, 883, 711, 17, 522, 601, 412, 994, 991, 477, 153, 452, 756, 982, 654, 469, 26, 775, 894, 180, 271, 845, 820, 315, 485, 164, 596, 531, 637, 680, 480, 988, 627, 935, 833, 884, 287, 127, 607, 500, 674, 937, 232, 38, 609, 438, 599, 229, 981, 61, 844, 402, 129, 930, 387, 920, 446, 672, 31, 240, 123, 830, 503, 462, 258, 591, 151, 207, 299, 398, 467, 852, 668, 834, 971, 270, 150, 144, 918, 100, 93, 114, 903, 166, 595, 6, 231, 11, 561, 193, 343, 47, 272, 666, 288, 942, 332, 646, 545, 481, 119, 75, 303, 439, 828, 840, 340, 999, 66, 866, 501, 990, 7, 593, 961, 350, 417, 978, 105, 18, 763, 479, 917, 84, 565, 906, 213, 192, 132, 498, 333, 424, 913, 719, 365, 296, 843, 395, 600, 86, 574, 576, 535, 249, 519, 725, 319, 760, 102, 993, 885, 947, 696, 13, 664, 426, 553, 958, 110, 685, 169, 37, 754, 639, 195, 316, 219, 367, 759, 475, 575, 238, 554, 373, 698, 773, 986, 155, 242, 143, 975, 789, 248, 635, 887, 370, 210, 351, 85, 968, 921, 692, 662, 890, 667, 765, 774, 458, 528, 956, 643, 821, 211, 853, 736, 813, 914, 872, 911, 693, 473, 30, 376, 571, 880, 742, 919, 216, 267, 77, 125, 111, 886, 96, 700, 126, 822, 669, 35, 172, 842, 959, 28, 651, 10, 967, 612, 750, 389, 568, 69, 362, 631, 142, 755, 555, 298, 243, 135, 280, 158, 524, 428, 608, 854, 745, 832, 787, 397, 104, 63, 165, 252, 191, 618, 122, 136, 616, 194, 162, 650, 868, 380, 786, 159, 985, 728, 386, 148, 598, 992, 145, 423, 611, 910, 433, 739, 0, 200, 202, 323, 870, 226, 998, 190, 12, 770, 98, 208, 290, 304, 900, 746, 860, 924, 809, 57, 173, 831, 456, 455, 3, 622, 338, 987, 583, 393, 718, 610, 851, 318, 620, 46, 59, 141, 209, 902, 453, 212, 874, 347, 92, 597, 996, 731, 896, 614, 284, 721, 513, 442, 683, 962, 533, 525, 81, 708, 888, 277, 941, 224, 50, 293, 381, 892, 814, 912, 915, 572, 369, 835, 377, 797, 720, 204, 653, 780, 322, 391, 14, 236, 972, 582, 331, 297, 317, 140, 944, 530, 27, 177, 124, 726, 713, 997, 253, 49, 544, 327, 406, 729, 371, 53, 603, 804, 727, 220, 948, 663, 949, 487, 863, 283, 112, 451, 566, 245, 139, 74, 121, 647, 43, 703, 670, 273, 805, 928, 960, 839, 115, 339, 8, 76, 186, 625, 849, 699, 427, 717, 782, 706, 823, 951, 926, 346, 266, 514, 1, 957, 695, 836, 418, 335, 108, 897, 72, 167, 25, 932, 665, 799, 321, 401, 735, 684, 676, 747, 435, 264, 227, 292, 83, 550, 103, 203, 641, 429, 757, 925, 407, 916, 686, 313, 282, 927, 146, 815, 244, 534, 178, 314, 898, 182, 640, 798, 405, 626, 748, 411, 687, 881, 869, 9, 324, 701, 716, 289, 19, 189, 54, 149, 379, 604, 824, 556, 933, 342, 97, 392, 160, 829, 188, 506, 682, 128, 811, 414, 109, 810, 394, 995, 761, 777, 633, 197, 931, 217, 246, 36, 474, 215, 67, 694, 275, 861, 825, 214, 679, 752, 875, 864, 764, 445, 152, 300, 348, 743, 939, 161, 538, 976, 497, 838, 895, 378, 361, 505, 460, 33, 196, 441, 465, 326, 691, 409, 88, 569, 793, 341, 557, 431, 329, 673, 523, 368, 279, 629, 905, 408, 515, 470, 677, 509, 658, 430, 73, 807, 858, 715, 973, 549, 846, 454, 163, 867, 690, 801, 237, 181, 68, 767, 276, 974, 630, 790, 624, 263, 463, 5, 285, 437, 382, 259, 147, 499, 779, 94, 788, 360, 374, 99, 58, 450, 697, 504, 41, 507, 352, 70, 857, 560, 714, 889, 87, 24, 510, 375, 589, 562, 483, 311, 413, 753, 179, 652, 540, 689, 328, 546, 741, 449, 443, 491, 291, 457, 434, 90, 722, 532, 390, 312, 2, 784, 733, 400, 819, 891, 712, 78, 55, 461, 871, 783, 403, 257, 644, 359, 579, 325, 274, 120, 934, 559, 228, 606, 656, 796, 785, 952, 239, 704, 410, 929, 660, 205, 157, 837, 678, 581, 548, 251, 542, 794, 970, 661, 39, 310, 218, 265, 385, 965, 436, 306, 702, 907, 138, 492, 657, 51, 64, 768, 34, 808, 448, 537, 353, 307, 235, 118, 95, 862, 979, 508, 80, 989, 632, 254, 22, 584, 355, 4, 580, 185, 587, 305, 552, 432, 850, 459, 675, 363, 372, 577, 922, 184, 170, 563, 71, 278, 198, 199, 415, 183, 447, 855, 168, 345, 62, 420, 511, 847, 977, 803, 636, 778, 740, 619, 486, 130, 791, 45, 738, 496, 52, 649, 983, 800, 56, 751, 396, 671, 946, 82, 792, 724, 594, 468, 65, 89, 399, 230, 638, 573, 32, 337, 466, 336, 269, 518, 384, 520, 16, 585, 174, 945, 940, 795, 879, 536, 758, 21, 241, 476, 859, 471, 422, 876, 943, 416, 817, 688, 502, 655, 440, 117, 771, 101, 302, 354, 543, 950, 613, 984, 281, 79, 484, 137, 642, 953, 388, 366, 286, 309, 344, 44, 709, 221, 710, 134, 201, 623, 48, 628, 268, 762, 806, 40, 737, 645, 734, 909, 964, 812, 482, 776, 113, 816, 42, 723, 349, 421, 472, 648, 617, 529, 493, 261, 605, 969, 551, 131, 330, 107, 707, 60, 495, 187, 592, 826, 106, 512, 301, 749, 225, 223, 570, 116, 955, 247, 586, 91, 23, 634, 802, 588, 175, 154, 521, 856, 364, 356, 539, 489, 206, 425, 176, 20, 295, 848, 156, 494, 963, 262, 526, 334, 621, 256, 234, 171, 250, 893, 541, 732, 954, 899, 133, 564, 567, 615, 744, 517, 865, 730, 357, 882, 419, 659, 705, 590, 15, 966, 827, 404, 602, 578, 464, 320, 222, 841, 490, 488, 29, 766, 766, 260, 681, 769, 772, 547, 558, 766], 368];
const arraysToLinkedLists = (arrays) => {
    const linkedLists = [];
    for (let list of arrays) {
        linkedLists.push(SinglyLinkedList.from(list).head);
    }
    return linkedLists;
};
export const mergeKListsCase1 = [arraysToLinkedLists([[1, 4, 5], [1, 3, 4], [2, 6]])];
export const mergeKListsCase2 = [arraysToLinkedLists([[1]])];
export const topKFrequentCase1 = [[1, 1, 1, 2, 2, 3], 2];
export const topKFrequentCase2 = [[1, 2], 2];
export const reorganizeStringCase1 = ['aab'];
export const reorganizeStringCase2 = ['aaab'];
export const reorganizeStringCase3 = ['aaaaabbbcccdde'];
