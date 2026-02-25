const civicsData = [
    {
        id: 1,
        question: "What is the form of government of the United States?",
        answers: ["Republic", "Constitution-based federal republic", "Representative democracy"],
        wrong: ["Constitutional monarchy", "Parliamentary republic", "Federal confederation"]
    },
    {
        id: 2,
        question: "What is the supreme law of the land?",
        answers: ["(U.S.) Constitution"],
        wrong: ["Declaration of Independence", "Bill of Rights", "Articles of Confederation"]
    },
    {
        id: 3,
        question: "Name one thing the U.S. Constitution does.",
        answers: ["Forms the government", "Defines powers of government", "Defines the parts of government", "Protects the rights of the people"],
        wrong: ["Establishes state governments", "Sets tax rates", "Creates political parties"]
    },
    {
        id: 4,
        question: "The U.S. Constitution starts with the words “We the People.” What does “We the People” mean?",
        answers: ["Self-government", "Popular sovereignty", "Consent of the governed", "People should govern themselves", "(Example of) social contract"],
        wrong: ["Rule by monarchy", "Government by Congress alone", "Authority from foreign nations"]
    },
    {
        id: 5,
        question: "How are changes made to the U.S. Constitution?",
        answers: ["Amendments", "The amendment process"],
        wrong: ["Executive orders", "Supreme Court rulings alone", "Congressional resolutions"]
    },
    {
        id: 6,
        question: "What does the Bill of Rights protect?",
        answers: ["(The basic) rights of Americans", "(The basic) rights of people living in the United States"],
        wrong: ["Powers of Congress", "State government authority", "Federal tax policies"]
    },
    {
        id: 7,
        question: "How many amendments does the U.S. Constitution have?",
        answers: ["Twenty-seven (27)"],
        wrong: ["Twenty-five (25)", "Twenty-six (26)", "Thirty (30)"]
    },
    {
        id: 8,
        question: "Why is the Declaration of Independence important?",
        answers: ["It says America is free from British control.", "It says all people are created equal.", "It identifies inherent rights.", "It identifies individual freedoms."],
        wrong: ["It created the federal court system.", "It established the presidency.", "It ended the Civil War."]
    },
    {
        id: 9,
        question: "What founding document said the American colonies were free from Britain?",
        answers: ["Declaration of Independence"],
        wrong: ["Articles of Confederation", "U.S. Constitution", "Federalist Papers"]
    },
    {
        id: 10,
        question: "Name two important ideas from the Declaration of Independence and the U.S. Constitution.",
        answers: ["Equality", "Liberty", "Social contract", "Natural rights", "Limited government", "Self-government"],
        wrong: ["Judicial supremacy", "Federal taxation", "Executive privilege"]
    },
    {
        id: 11,
        question: "The words “Life, Liberty, and the pursuit of Happiness” are in what founding document?",
        answers: ["Declaration of Independence"],
        wrong: ["U.S. Constitution", "Bill of Rights", "Federalist Papers"]
    },
    {
        id: 12,
        question: "What is the economic system of the United States?",
        answers: ["Capitalism", "Free market economy"],
        wrong: ["Command economy", "Socialist republic", "Mixed central planning system"]
    },
    {
        id: 13,
        question: "What is the rule of law?",
        answers: ["Everyone must follow the law.", "Leaders must obey the law.", "Government must obey the law.", "No one is above the law."],
        wrong: ["Only citizens must follow the law.", "The President can override laws.", "Courts create all laws."]
    },
    {
        id: 14,
        question: "Many documents influenced the U.S. Constitution. Name one.",
        answers: ["Declaration of Independence", "Articles of Confederation", "Federalist Papers", "Anti-Federalist Papers", "Virginia Declaration of Rights", "Fundamental Orders of Connecticut", "Mayflower Compact", "Iroquois Great Law of Peace"],
        wrong: ["Magna Carta", "English Bill of Rights", "Northwest Ordinance"]
    },
    {
        id: 15,
        question: "There are three branches of government. Why?",
        answers: ["So one part does not become too powerful", "Checks and balances", "Separation of powers"],
        wrong: ["To increase government size", "To allow states to control Congress", "To prevent elections"]
    },
    {
        id: 16,
        question: "Name the three branches of government.",
        answers: ["Legislative, executive, and judicial", "Congress, president, and the courts"],
        wrong: ["Senate, Cabinet, and Supreme Court", "House, Senate, and President", "Congress, Governors, and Courts"]
    },
    {
        id: 17,
        question: "The President of the United States is in charge of which branch of government?",
        answers: ["Executive branch"],
        wrong: ["Legislative branch", "Judicial branch", "State branch"]
    },
    {
        id: 18,
        question: "What part of the federal government writes laws?",
        answers: ["(U.S.) Congress", "(U.S. or national) legislature", "Legislative branch"],
        wrong: ["Supreme Court", "President", "Cabinet"]
    },
    {
        id: 19,
        question: "What are the two parts of the U.S. Congress?",
        answers: ["Senate and House (of Representatives)"],
        wrong: ["Senate and Supreme Court", "House and Cabinet", "Congress and President"]
    },
    {
        id: 20,
        question: "Name one power of the U.S. Congress.",
        answers: ["Writes laws", "Declares war", "Makes the federal budget"],
        wrong: ["Appoints Supreme Court justices", "Commands the military", "Signs treaties"]
    },
    {
        id: 21,
        question: "How many U.S. senators are there?",
        answers: ["One hundred (100)"],
        wrong: ["98", "102", "110"]
    },
    {
        id: 22,
        question: "How long is a term for a U.S. senator?",
        answers: ["Six (6) years"],
        wrong: ["Four (4) years", "Eight (8) years", "Two (2) years"]
    },
    {
        id: 23,
        question: "Who is one of your state’s U.S. senators now?",
        answers: ["Elizabeth Warren", "Ed Markey"],
        wrong: ["Richard Neal", "Ayanna Pressley", "Katherine Clark"]
    },
    {
        id: 24,
        question: "How many voting members are in the House of Representatives?",
        answers: ["Four hundred thirty-five (435)"],
        wrong: ["430", "440", "450"]
    },
    {
        id: 25,
        question: "How long is a term for a member of the House of Representatives?",
        answers: ["Two (2) years"],
        wrong: ["4 years", "6 years", "3 years"]
    },
    {
        id: 26,
        question: "Why do U.S. representatives serve shorter terms than U.S. senators?",
        answers: ["To more closely follow public opinion"],
        wrong: ["To limit campaign spending", "To reduce Senate power", "To align with presidential terms"]
    },
    {
        id: 27,
        question: "How many senators does each state have?",
        answers: ["Two (2)"],
        wrong: ["One (1)", "Three (3)", "Four (4)"]
    },
    {
        id: 28,
        question: "Why does each state have two senators?",
        answers: ["Equal representation (for small states)", "The Great Compromise (Connecticut Compromise)"],
        wrong: ["To reflect population size", "To increase federal authority", "To balance the presidency"]
    },
    {
        id: 29,
        question: "Name your U.S. representative.",
        answers: ["Stephen F. Lynch"],
        wrong: ["Seth Moulton", "Bill Keating", "Lori Trahan"]
    },
    {
        id: 30,
        question: "What is the name of the Speaker of the House of Representatives now?",
        answers: ["Mike Johnson"],
        wrong: ["Hakeem Jeffries", "Kevin McCarthy", "Steve Scalise"]
    },
    {
        id: 31,
        question: "Who does a U.S. senator represent?",
        answers: ["Citizens of their state", "People of their state"],
        wrong: ["Citizens of their district", "Only registered voters", "The President"]
    },
    {
        id: 32,
        question: "Who elects U.S. senators?",
        answers: ["Citizens from their state"],
        wrong: ["The President", "State governors", "Congress"]
    },
    {
        id: 33,
        question: "Who does a member of the House of Representatives represent?",
        answers: ["Citizens in their (congressional) district", "People in their district"],
        wrong: ["Citizens of their state", "Senators", "Federal agencies"]
    },
    {
        id: 34,
        question: "Who elects members of the House of Representatives?",
        answers: ["Citizens from their (congressional) district"],
        wrong: ["State legislatures", "The President", "Supreme Court"]
    },
    {
        id: 35,
        question: "Some states have more representatives than other states. Why?",
        answers: ["(Because of) the state’s population", "(Because) they have more people", "(Because) some states have more people"],
        wrong: ["Because they have more land", "Because of economic size", "Because of tax revenue"]
    },
    {
        id: 36,
        question: "The President of the United States is elected for how many years?",
        answers: ["Four (4) years"],
        wrong: ["Two (2) years", "Six (6) years", "Eight (8) years"]
    },
    {
        id: 37,
        question: "The President of the United States can serve only two terms. Why?",
        answers: ["(Because of) the 22nd Amendment", "To keep the president from becoming too powerful"],
        wrong: ["20th Amendment", "Supreme Court ruling", "19th Amendment"]
    },
    {
        id: 38,
        question: "What is the name of the President of the United States now?",
        answers: ["Donald J. Trump"],
        wrong: ["Joe Biden", "Kamala Harris", "Ron DeSantis"]
    },
    {
        id: 39,
        question: "What is the name of the Vice President of the United States now?",
        answers: ["J.D. Vance"],
        wrong: ["Kamala Harris", "Marco Rubio", "Nikki Haley"]
    },
    {
        id: 40,
        question: "If the president can no longer serve, who becomes president?",
        answers: ["The Vice President (of the United States)"],
        wrong: ["Speaker of the House", "Chief Justice", "Secretary of State"]
    },
    {
        id: 41,
        question: "Name one power of the president.",
        answers: ["Signs bills into law", "Vetoes bills", "Enforces laws", "Commander in Chief (of the military)", "Chief diplomat", "Appoints federal judges"],
        wrong: ["Declares war", "Writes federal laws", "Sets the federal budget alone"]
    },
    {
        id: 42,
        question: "Who is Commander in Chief of the U.S. military?",
        answers: ["The President (of the United States)"],
        wrong: ["Secretary of Defense", "Chairman of the Joint Chiefs", "Congress"]
    },
    {
        id: 43,
        question: "Who signs bills to become laws?",
        answers: ["The President (of the United States)"],
        wrong: ["Speaker of the House", "Chief Justice", "Senate Majority Leader"]
    },
    {
        id: 44,
        question: "Who vetoes bills?",
        answers: ["The President (of the United States)"],
        wrong: ["Congress", "Supreme Court", "Vice President"]
    },
    {
        id: 45,
        question: "Who appoints federal judges?",
        answers: ["The President (of the United States)"],
        wrong: ["Congress", "Supreme Court", "State governors"]
    },
    {
        id: 46,
        question: "The executive branch has many parts. Name one.",
        answers: ["President (of the United States)", "Cabinet", "Federal departments and agencies"],
        wrong: ["Senate", "Supreme Court", "State legislatures"]
    },
    {
        id: 47,
        question: "What does the President’s Cabinet do?",
        answers: ["Advises the President (of the United States)"],
        wrong: ["Writes federal laws", "Approves Supreme Court cases", "Elects the Vice President"]
    },
    {
        id: 48,
        question: "What are two Cabinet-level positions?",
        answers: ["Attorney General", "Secretary of State", "Secretary of Defense", "Secretary of the Treasury", "Vice-President", "Secretary of Homeland Security"],
        wrong: ["Speaker of the House", "Chief Justice", "Senate Majority Leader"]
    },
    {
        id: 49,
        question: "Why is the Electoral College important?",
        answers: ["It decides who is elected president.", "It provides a compromise between the popular election of the president and congressional selection."],
        wrong: ["It selects Supreme Court justices.", "It confirms Cabinet members.", "It certifies congressional elections."]
    },
    {
        id: 50,
        question: "What is one part of the judicial branch?",
        answers: ["Supreme Court", "Federal Courts"],
        wrong: ["Senate Judiciary Committee", "Department of Justice", "State courts only"]
    },
    {
        id: 51,
        question: "What does the judicial branch do?",
        answers: ["Reviews laws", "Explains laws", "Resolves disputes (disagreements) about the law", "Decides if a law goes against the (U.S.) Constitution"],
        wrong: ["Writes new laws", "Enforces federal laws", "Conducts elections"]
    },
    {
        id: 52,
        question: "What is the highest court in the United States?",
        answers: ["Supreme Court"],
        wrong: ["Court of Appeals", "Federal District Court", "Senate Judiciary Committee"]
    },
    {
        id: 53,
        question: "How many seats are on the Supreme Court?",
        answers: ["Nine (9)"],
        wrong: ["Seven (7)", "Eleven (11)", "Twelve (12)"]
    },
    {
        id: 54,
        question: "How many Supreme Court justices are usually needed to decide a case?",
        answers: ["Five (5)"],
        wrong: ["Four (4)", "Six (6)", "Nine (9)"]
    },
    {
        id: 55,
        question: "How long do Supreme Court justices serve?",
        answers: ["(For) life", "Lifetime appointment", "(Until) retirement"],
        wrong: ["Eight-year term", "Ten-year term", "Until age 70"]
    },
    {
        id: 56,
        question: "Supreme Court justices serve for life. Why?",
        answers: ["To be independent (of politics)", "To limit outside (political) influence"],
        wrong: ["To match presidential terms", "To increase congressional control", "To prevent elections"]
    },
    {
        id: 57,
        question: "Who is the Chief Justice of the United States now?",
        answers: ["John Roberts"],
        wrong: ["Clarence Thomas", "Samuel Alito", "Brett Kavanaugh"]
    },
    {
        id: 58,
        question: "Name one power that is only for the federal government.",
        answers: ["Print paper money", "Mint coins", "Declare war", "Create an army", "Make treaties", "Set foreign policy"],
        wrong: ["Issue driver’s licenses", "Conduct local elections", "Establish school districts"]
    },
    {
        id: 59,
        question: "Name one power that is only for the states.",
        answers: ["Provide schooling and education", "Provide protection (police)", "Provide safety (fire departments)", "Give a driver’s license", "Approve zoning and land use"],
        wrong: ["Declare war", "Print money", "Make treaties"]
    },
    {
        id: 60,
        question: "What is the purpose of the 10th Amendment?",
        answers: ["(It states that the) powers not given to the federal government belong to the states or to the people."],
        wrong: ["Establishes freedom of speech", "Limits presidential terms", "Guarantees voting rights for women"]
    },
    {
        id: 61,
        question: "Who is the governor of your state now?",
        answers: ["Maura Healey"],
        wrong: ["Charlie Baker", "Deval Patrick", "Elizabeth Warren"]
    },
    {
        id: 62,
        question: "What is the capital of your state?",
        answers: ["Boston"],
        wrong: ["Springfield", "Worcester", "Cambridge"]
    },
    {
        id: 63,
        question: "There are four amendments to the U.S. Constitution about who can vote. Describe one of them.",
        answers: ["Citizens eighteen (18) and older (can vote).", "You don’t have to pay (a poll tax) to vote.", "Any citizen can vote. (Women and men can vote.)", "A male citizen of any race (can vote)."],
        wrong: ["Citizens must own property to vote.", "Only men over 21 can vote.", "Voting is required by law."]
    },
    {
        id: 64,
        question: "Who can vote in federal elections, run for federal office, and serve on a jury in the United States?",
        answers: ["Citizens", "Citizens of the United States", "U.S. citizens"],
        wrong: ["Permanent residents", "Visa holders", "All taxpayers"]
    },
    {
        id: 65,
        question: "What are three rights of everyone living in the United States?",
        answers: ["Freedom of expression", "Freedom of speech", "Freedom of assembly", "Freedom to petition the government", "Freedom of religion", "The right to bear arms"],
        wrong: ["Right to vote in federal elections", "Right to hold federal office", "Right to free college education"]
    },
    {
        id: 66,
        question: "What do we show loyalty to when we say the Pledge of Allegiance?",
        answers: ["The United States", "The flag"],
        wrong: ["The President", "Congress", "The Constitution only"]
    },
    {
        id: 67,
        question: "Name two promises that new citizens make in the Oath of Allegiance.",
        answers: ["Give up loyalty to other countries", "Defend the (U.S.) Constitution", "Obey the laws of the United States", "Serve in the military (if needed)", "Serve (help, do important work for) the nation (if needed)", "Be loyal to the United States"],
        wrong: ["Serve on a jury immediately", "Vote in every election", "Pay higher taxes"]
    },
    {
        id: 68,
        question: "How can people become United States citizens?",
        answers: ["Be born in the United States, under the conditions set by the 14th Amendment", "Naturalize", "Derive citizenship (under conditions set by Congress)"],
        wrong: ["Marry a U.S. citizen automatically", "Serve in the military automatically", "Apply for a visa"]
    },
    {
        id: 69,
        question: "What are two examples of civic participation in the United States?",
        answers: ["Vote", "Run for office", "Join a political party", "Help with a campaign", "Join a civic group", "Join a community group", "Give an elected official your opinion (on an issue)", "Contact elected officials", "Support or oppose an issue or policy", "Write to a newspaper"],
        wrong: ["Serve as a Supreme Court justice", "Pay private taxes", "Become a federal judge automatically"]
    },
    {
        id: 70,
        question: "What is one way Americans can serve their country?",
        answers: ["Vote", "Pay taxes", "Obey the law", "Serve in the military", "Run for office", "Work for local, state, or federal government"],
        wrong: ["Become President", "Join the Supreme Court", "Work for a foreign government"]
    },
    {
        id: 71,
        question: "Why is it important to pay federal taxes?",
        answers: ["Required by law", "All people pay to fund the federal government", "Required by the (U.S.) Constitution (16th Amendment)", "Civic duty"],
        wrong: ["To fund state governments only", "To increase personal benefits", "To reduce voting requirements"]
    },
    {
        id: 72,
        question: "It is important for all men age 18 through 25 to register for the Selective Service. Name one reason why.",
        answers: ["Required by law", "Civic duty", "Makes the draft fair, if needed"],
        wrong: ["To qualify for voting", "To receive tax benefits", "To run for Congress"]
    },
    {
        id: 73,
        question: "The colonists came to America for many reasons. Name one.",
        answers: ["Freedom", "Political liberty", "Religious freedom", "Economic opportunity", "Escape persecution"],
        wrong: ["Mandatory relocation", "Military assignment", "To expand the British Empire directly"]
    },
    {
        id: 74,
        question: "Who lived in America before the Europeans arrived?",
        answers: ["American Indians", "Native Americans"],
        wrong: ["European settlers", "Spanish conquistadors", "French colonists"]
    },
    {
        id: 75,
        question: "What group of people was taken and sold as slaves?",
        answers: ["Africans", "People from Africa"],
        wrong: ["Native Americans", "Irish immigrants", "Chinese laborers"]
    },
    {
        id: 76,
        question: "What war did the Americans fight to win independence from Britain?",
        answers: ["American Revolution", "The (American) Revolutionary War", "War for (American) Independence"],
        wrong: ["War of 1812", "Civil War", "French and Indian War"]
    },
    {
        id: 77,
        question: "Name one reason why the Americans declared independence from Britain.",
        answers: ["High taxes", "Taxation without representation", "British soldiers stayed in Americans’ houses (boarding, quartering)", "They did not have self-government", "Boston Massacre", "Boston Tea Party (Tea Act)", "Stamp Act", "Sugar Act", "Townshend Acts", "Intolerable (Coercive) Acts"],
        wrong: ["Lack of industrialization", "No standing army", "Disagreement over western expansion only"]
    },
    {
        id: 78,
        question: "Who wrote the Declaration of Independence?",
        answers: ["(Thomas) Jefferson"],
        wrong: ["John Adams", "James Madison", "Benjamin Franklin"]
    },
    {
        id: 79,
        question: "When was the Declaration of Independence adopted?",
        answers: ["July 4, 1776"],
        wrong: ["July 2, 1776", "August 4, 1776", "July 4, 1787"]
    },
    {
        id: 80,
        question: "The American Revolution had many important events. Name one.",
        answers: ["(Battle of) Bunker Hill", "Declaration of Independence", "Washington Crossing the Delaware (Battle of Trenton)", "(Battle of) Saratoga", "Valley Forge (Encampment)", "(Battle of) Yorktown (British surrender at Yorktown)"],
        wrong: ["Battle of Lexington and Concord", "Treaty of Paris (1763)", "Louisiana Purchase"]
    },
    {
        id: 81,
        question: "There were 13 original states. Name five.",
        answers: ["New Hampshire", "Massachusetts", "Rhode Island", "Connecticut", "New York", "New Jersey", "Pennsylvania", "Delaware", "Maryland", "Virginia", "North Carolina", "South Carolina", "Georgia"],
        wrong: ["Vermont", "Maine", "Kentucky"]
    },
    {
        id: 82,
        question: "What founding document was written in 1787?",
        answers: ["(U.S.) Constitution"],
        wrong: ["Declaration of Independence", "Articles of Confederation", "Bill of Rights"]
    },
    {
        id: 83,
        question: "The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.",
        answers: ["(James) Madison", "(Alexander) Hamilton", "(John) Jay", "Publius"],
        wrong: ["Thomas Jefferson", "George Washington", "Benjamin Franklin"]
    },
    {
        id: 84,
        question: "Why were the Federalist Papers important?",
        answers: ["They helped people understand the (U.S.) Constitution.", "They supported passing the (U.S.) Constitution."],
        wrong: ["Established the Bill of Rights", "Ended the Revolutionary War", "Created the Supreme Court"]
    },
    {
        id: 85,
        question: "Benjamin Franklin is famous for many things. Name one.",
        answers: ["Founded the first free public libraries", "First Postmaster General of the United States", "Helped write the Declaration of Independence", "Inventor", "U.S. diplomat"],
        wrong: ["First President of the United States", "Author of the Constitution", "Chief Justice of the Supreme Court"]
    },
    {
        id: 86,
        question: "George Washington is famous for many things. Name one.",
        answers: ["“Father of Our Country”", "First president of the United States", "General of the Continental Army", "President of the Constitutional Convention"],
        wrong: ["Writer of the Federalist Papers", "Founder of the Republican Party", "Chief Justice of the Supreme Court"]
    },
    {
        id: 87,
        question: "Thomas Jefferson is famous for many things. Name one.",
        answers: ["Writer of the Declaration of Independence", "Third president of the United States", "Doubled the size of the United States (Louisiana Purchase)", "First Secretary of State", "Founded the University of Virginia", "Writer of the Virginia Statute on Religious Freedom"],
        wrong: ["16th president of the United States", "Led the Union during the Civil War", "Signed the Emancipation Proclamation"]
    },
    {
        id: 88,
        question: "James Madison is famous for many things. Name one.",
        answers: ["“Father of the Constitution”", "Fourth president of the United States", "President during the War of 1812", "One of the writers of the Federalist Papers"],
        wrong: ["First Secretary of State", "General in the Revolutionary War", "Chief Justice of the Supreme Court"]
    },
    {
        id: 89,
        question: "Alexander Hamilton is famous for many things. Name one.",
        answers: ["First Secretary of the Treasury", "One of the writers of the Federalist Papers", "Helped establish the First Bank of the United States", "Aide to General George Washington", "Member of the Continental Congress"],
        wrong: ["Third President of the United States", "Leader of the Confederacy", "Chief Justice of the Supreme Court"]
    },
    {
        id: 90,
        question: "What territory did the United States buy from France in 1803?",
        answers: ["Louisiana Territory", "Louisiana"],
        wrong: ["Florida Territory", "Alaska Territory", "Oregon Territory"]
    },
    {
        id: 91,
        question: "Name one war fought by the United States in the 1800s.",
        answers: ["War of 1812", "Mexican-American War", "Civil War", "Spanish-American War"],
        wrong: ["American Revolution", "World War I", "Korean War"]
    },
    {
        id: 92,
        question: "Name the U.S. war between the North and the South.",
        answers: ["The Civil War"],
        wrong: ["Revolutionary War", "War of 1812", "Mexican-American War"]
    },
    {
        id: 93,
        question: "The Civil War had many important events. Name one.",
        answers: ["(Battle of) Fort Sumter", "Emancipation Proclamation", "(Battle of) Vicksburg", "(Battle of) Gettysburg", "Sherman’s March", "(Surrender at) Appomattox", "(Battle of) Antietam/Sharpsburg", "Lincoln was assassinated."],
        wrong: ["Louisiana Purchase", "Treaty of Paris (1783)", "Boston Tea Party"]
    },
    {
        id: 94,
        question: "Abraham Lincoln is famous for many things. Name one.",
        answers: ["Freed the slaves (Emancipation Proclamation)", "Saved (or preserved) the Union", "Led the United States during the Civil War", "16th president of the United States", "Delivered the Gettysburg Address"],
        wrong: ["First President of the United States", "Author of the Constitution", "Led the U.S. in World War I"]
    },
    {
        id: 95,
        question: "What did the Emancipation Proclamation do?",
        answers: ["Freed the slaves", "Freed slaves in the Confederacy", "Freed slaves in the Confederate states", "Freed slaves in most Southern states"],
        wrong: ["Ended the Civil War", "Granted women the right to vote", "Abolished slavery nationwide immediately"]
    },
    {
        id: 96,
        question: "What U.S. war ended slavery?",
        answers: ["The Civil War"],
        wrong: ["Revolutionary War", "War of 1812", "Spanish-American War"]
    },
    {
        id: 97,
        question: "What amendment says all persons born or naturalized in the United States, and subject to the jurisdiction thereof, are U.S. citizens?",
        answers: ["14th Amendment"],
        wrong: ["13th Amendment", "15th Amendment", "19th Amendment"]
    },
    {
        id: 98,
        question: "When did all men get the right to vote?",
        answers: ["After the Civil War", "During Reconstruction", "(With the) 15th Amendment", "1870"],
        wrong: ["1865", "1868", "1920"]
    },
    {
        id: 99,
        question: "Name one leader of the women’s rights movement in the 1800s.",
        answers: ["Susan B. Anthony", "Elizabeth Cady Stanton", "Sojourner Truth", "Harriet Tubman", "Lucretia Mott", "Lucy Stone"],
        wrong: ["Eleanor Roosevelt", "Rosa Parks", "Betty Friedan"]
    },
    {
        id: 100,
        question: "Name one war fought by the United States in the 1900s.",
        answers: ["World War I", "World War II", "Korean War", "Vietnam War", "(Persian) Gulf War"],
        wrong: ["Civil War", "War of 1812", "Revolutionary War"]
    },
    {
        id: 101,
        question: "Why did the United States enter World War I?",
        answers: ["Because Germany attacked U.S. (civilian) ships", "To support the Allied Powers (England, France, Italy, and Russia)", "To oppose the Central Powers (Germany, Austria-Hungary, the Ottoman Empire, and Bulgaria)"],
        wrong: ["Attack on Pearl Harbor", "Spread of communism in Asia", "Iraqi invasion of Kuwait"]
    },
    {
        id: 102,
        question: "When did all women get the right to vote?",
        answers: ["1920", "After World War I", "(With the) 19th Amendment"],
        wrong: ["1918", "1919", "1924"]
    },
    {
        id: 103,
        question: "What was the Great Depression?",
        answers: ["Longest economic recession in modern history"],
        wrong: ["A major war in Europe", "A constitutional crisis", "A civil rights movement"]
    },
    {
        id: 104,
        question: "When did the Great Depression start?",
        answers: ["The Great Crash (1929)", "Stock market crash of 1929"],
        wrong: ["1928", "1930", "1932"]
    },
    {
        id: 105,
        question: "Who was president during the Great Depression and World War II?",
        answers: ["(Franklin) Roosevelt"],
        wrong: ["Herbert Hoover", "Harry Truman", "Dwight Eisenhower"]
    },
    {
        id: 106,
        question: "Why did the United States enter World War II?",
        answers: ["(Bombing of) Pearl Harbor", "Japanese attacked Pearl Harbor", "To support the Allied Powers (England, France, and Russia)", "To oppose the Axis Powers (Germany, Italy, and Japan)"],
        wrong: ["German invasion of Poland", "Russian Revolution", "Korean invasion of the South"]
    },
    {
        id: 107,
        question: "Dwight Eisenhower is famous for many things. Name one.",
        answers: ["General during World War II", "President at the end of (during) the Korean War", "34th president of the United States", "Signed the Federal-Aid Highway Act of 1956 (Created the Interstate System)"],
        wrong: ["First President of the United States", "Leader of the Confederacy", "Author of the Federalist Papers"]
    },
    {
        id: 108,
        question: "Who was the United States’ main rival during the Cold War?",
        answers: ["Soviet Union", "USSR", "Russia"],
        wrong: ["China", "North Korea", "Cuba"]
    },
    {
        id: 109,
        question: "During the Cold War, what was one main concern of the United States?",
        answers: ["Communism", "Nuclear war"],
        wrong: ["Expansion of the British Empire", "French colonialism", "Spanish-American conflict"]
    },
    {
        id: 110,
        question: "Why did the United States enter the Korean War?",
        answers: ["To stop the spread of communism"],
        wrong: ["To defeat Japan", "To remove Saddam Hussein", "To gain territory in Asia"]
    },
    {
        id: 111,
        question: "Why did the United States enter the Vietnam War?",
        answers: ["To stop the spread of communism"],
        wrong: ["To defeat Germany", "To protect Kuwait", "To fight Spain"]
    },
    {
        id: 112,
        question: "What did the civil rights movement do?",
        answers: ["Fought to end racial discrimination"],
        wrong: ["Created the Constitution", "Ended World War II", "Granted independence from Britain"]
    },
    {
        id: 113,
        question: "Martin Luther King, Jr. is famous for many things. Name one.",
        answers: ["Fought for civil rights", "Worked for equality for all Americans", "Worked to ensure that people would “not be judged by the color of their skin, but by the content of their character”"],
        wrong: ["16th President of the United States", "Author of the Federalist Papers", "Chief Justice of the Supreme Court"]
    },
    {
        id: 114,
        question: "Why did the United States enter the Persian Gulf War?",
        answers: ["To force the Iraqi military from Kuwait"],
        wrong: ["To stop the spread of communism", "To respond to Pearl Harbor", "To end World War I"]
    },
    {
        id: 115,
        question: "What major event happened on September 11, 2001 in the United States?",
        answers: ["Terrorists attacked the United States", "Terrorists took over two planes and crashed them into the World Trade Center in New York City", "Terrorists took over a plane and crashed into the Pentagon in Arlington, Virginia", "Terrorists took over a plane originally aimed at Washington, D.C., and crashed in a field in Pennsylvania"],
        wrong: ["Bombing of Pearl Harbor", "Oklahoma City bombing", "Attack on the USS Cole"]
    },
    {
        id: 116,
        question: "Name one U.S. military conflict after the September 11, 2001 attacks.",
        answers: ["(Global) War on Terror", "War in Afghanistan", "War in Iraq"],
        wrong: ["Korean War", "Vietnam War", "Spanish-American War"]
    },
    {
        id: 117,
        question: "Name one American Indian tribe in the United States.",
        answers: ["Apache", "Blackfeet", "Cayuga", "Cherokee", "Cheyenne", "Chippewa", "Choctaw", "Creek", "Crow", "Hopi", "Huron", "Inupiat", "Lakota", "Mohawk", "Mohegan", "Navajo", "Oneida", "Onondaga", "Pueblo", "Seminole", "Seneca", "Shawnee", "Sioux", "Teton", "Tuscarora"],
        wrong: ["Inuit (Canada)", "Aztec", "Maya"]
    },
    {
        id: 118,
        question: "Name one example of an American innovation.",
        answers: ["Light bulb", "Automobile (cars, internal combustion engine)", "Skyscrapers", "Airplane", "Assembly line", "Landing on the moon", "Integrated circuit (IC)"],
        wrong: ["Steam engine", "Printing press", "Telephone exchange system (British origin)"]
    },
    {
        id: 119,
        question: "What is the capital of the United States?",
        answers: ["Washington, D.C."],
        wrong: ["New York City", "Philadelphia", "Boston"]
    },
    {
        id: 120,
        question: "Where is the Statue of Liberty?",
        answers: ["New York (Harbor)", "Liberty Island"],
        wrong: ["Ellis Island", "Staten Island", "Boston Harbor"]
    },
    {
        id: 121,
        question: "Why does the flag have 13 stripes?",
        answers: ["(Because there were) 13 original colonies", "(Because the stripes) represent the original colonies"],
        wrong: ["13 amendments", "13 presidents", "13 Supreme Court justices"]
    },
    {
        id: 122,
        question: "Why does the flag have 50 stars?",
        answers: ["(Because there is) one star for each state", "(Because) each star represents a state", "(Because there are) 50 states"],
        wrong: ["50 original colonies", "50 amendments", "50 senators"]
    },
    {
        id: 123,
        question: "What is the name of the national anthem?",
        answers: ["The Star-Spangled Banner"],
        wrong: ["America the Beautiful", "My Country, ’Tis of Thee", "God Bless America"]
    },
    {
        id: 124,
        question: "The Nation’s first motto was “E Pluribus Unum.” What does that mean?",
        answers: ["Out of many, one", "We all become one"],
        wrong: ["In God We Trust", "Liberty and Justice for All", "United We Stand"]
    },
    {
        id: 125,
        question: "What is Independence Day?",
        answers: ["A holiday to celebrate U.S. independence (from Britain)", "The country’s birthday"],
        wrong: ["Memorial of Civil War soldiers", "Signing of the Constitution", "End of World War II"]
    },
    {
        id: 126,
        question: "Name three national U.S. holidays.",
        answers: ["New Year’s Day", "Martin Luther King, Jr. Day", "Presidents Day (Washington’s Birthday)", "Memorial Day", "Juneteenth", "Independence Day", "Labor Day", "Columbus Day", "Veterans Day", "Thanksgiving Day", "Christmas Day"],
        wrong: ["Election Day", "Super Bowl Sunday", "Tax Day"]
    },
    {
        id: 127,
        question: "What is Memorial Day?",
        answers: ["A holiday to honor soldiers who died in military service"],
        wrong: ["A holiday to honor all veterans", "A holiday celebrating independence", "A holiday honoring presidents"]
    },
    {
        id: 128,
        question: "What is Veterans Day?",
        answers: ["A holiday to honor people in the (U.S.) military", "A holiday to honor people who have served (in the U.S. military)."],
        wrong: ["A holiday honoring soldiers who died in war", "A holiday celebrating the Constitution", "A holiday marking the end of World War II"]
    }
];
