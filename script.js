// =========================================
// HOSPITAL OPD SCHEDULE SYSTEM
// =========================================


// =========================================
// ELEMENTS
// =========================================

const hospitalSelect =
  document.getElementById("hospitalSelect");

const departmentSelect =
  document.getElementById("departmentSelect");

const daySelect =
  document.getElementById("daySelect");

const searchButton =
  document.getElementById("searchButton");

const resultContent =
  document.getElementById("resultContent");

const resultStatus =
  document.getElementById("resultStatus");

const contactHospitalName =
  document.getElementById("contactHospitalName");

const callButton =
  document.getElementById("callButton");

const selectedDepartmentPreview =
  document.getElementById(
    "selectedDepartmentPreview"
  );

const hospitalDoor =
  document.getElementById("hospitalDoor");


// =========================================
// COMMON OPD TIME
// =========================================

const OPD_TIME =
  "সকাল ০৮০০ টা থেকে দুপুর ০২৩০ পর্যন্ত";


// =========================================
// HOSPITAL DATA
// =========================================

const hospitalData = {

  tejgaon: {

    name:
      "Medical Inspection Room, Tejgaon",

    phone:
      "+8801769975342",

    schedule: {

      saturday: [
        "child",
        "medicine"
      ],

      sunday: [
        "eye",
        "child",
        "medicine",
        "ent",
        "gynecology",
        "skin"
      ],

      monday: [
        "dental",
        "child",
        "medicine",
        "gynecology"
      ],

      tuesday: [
        "child",
        "medicine",
        "gynecology",
        "skin"
      ],

      wednesday: [
        "child",
        "medicine",
        "ent",
        "gynecology"
      ],

      thursday: [
        "dental",
        "child",
        "medicine",
        "skin"
      ]

    }

  },


  kurmitola: {

    name:
      "Medical Inspection Room, Kurmitola",

    phone:
      "+8801769980024",

    schedule: {

      saturday: [
        "eye",
        "child"
      ],

      sunday: [
        "child"
      ],

      monday: [
        "dental",
        "child",
        "medicine"
      ],

      tuesday: [
        "dental",
        "child"
      ],

      wednesday: [
        "eye",
        "child",
        "medicine"
      ],

      thursday: [
        "child"
      ]

    }

  }

};


// =========================================
// DEPARTMENT INFORMATION
// =========================================

const departmentData = {

  eye: {
    name: "Eye",
    icon: "👁️"
  },

  child: {
    name: "Child",
    icon: "👶"
  },

  medicine: {
    name: "Medicine",
    icon: "🩺"
  },

  ent: {
    name: "ENT",
    icon: "👂"
  },

  gynecology: {
    name: "Gynecology",
    icon: "🩷"
  },

  skin: {
    name: "Skin",
    icon: "🧴"
  },

  dental: {
    name: "Dental",
    icon: "🦷"
  }

};


// =========================================
// DAY INFORMATION
// =========================================

const dayData = {

  saturday: {
    name: "শনিবার"
  },

  sunday: {
    name: "রবিবার"
  },

  monday: {
    name: "সোমবার"
  },

  tuesday: {
    name: "মঙ্গলবার"
  },

  wednesday: {
    name: "বুধবার"
  },

  thursday: {
    name: "বৃহস্পতিবার"
  },

  friday: {
    name: "শুক্রবার"
  }

};


// =========================================
// WEEK ORDER
// =========================================

const weekOrder = [

  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday"

];


// =========================================
// HOSPITAL SELECT
// =========================================

hospitalSelect.addEventListener(
  "change",
  function () {

    const hospital =
      hospitalData[this.value];


    // Reset department

    departmentSelect.innerHTML = `
      <option value="">
        প্রথমে হাসপাতাল নির্বাচন করুন
      </option>
    `;

    departmentSelect.disabled = true;


    // Reset day

    daySelect.innerHTML = `
      <option value="">
        প্রথমে বিভাগ নির্বাচন করুন
      </option>
    `;

    daySelect.disabled = true;


    // Reset button

    searchButton.disabled = true;


    // Reset department preview

    selectedDepartmentPreview.innerHTML =
      "🩺 বিভাগ নির্বাচন করলে প্রতীক এখানে দেখা যাবে";


    // Reset result

    resetResult();


    // No hospital selected

    if (!hospital) {

      contactHospitalName.textContent =
        "হাসপাতাল নির্বাচন করুন";

      disableCallButton();

      return;

    }


    // Update contact hospital

    contactHospitalName.textContent =
      hospital.name;


    // Enable correct call button

    enableCallButton(
      hospital.phone
    );


    // Enable department selection

    departmentSelect.disabled =
      false;


    departmentSelect.innerHTML = `
      <option value="">
        বিভাগ নির্বাচন করুন
      </option>
    `;


    // Get available departments

    const departments =
      getHospitalDepartments(
        hospital
      );


    // Add departments

    departments.forEach(
      function (department) {

        const info =
          departmentData[department];

        const option =
          document.createElement(
            "option"
          );

        option.value =
          department;

        option.textContent =
          `${info.icon} ${info.name}`;

        departmentSelect.appendChild(
          option
        );

      }
    );

  }
);


// =========================================
// GET UNIQUE DEPARTMENTS
// =========================================

function getHospitalDepartments(
  hospital
) {

  const departments = [];


  Object.values(
    hospital.schedule
  ).forEach(
    function (dayDepartments) {

      dayDepartments.forEach(
        function (department) {

          if (
            !departments.includes(
              department
            )
          ) {

            departments.push(
              department
            );

          }

        }
      );

    }
  );


  return departments;

}


// =========================================
// DEPARTMENT SELECT
// =========================================

departmentSelect.addEventListener(
  "change",
  function () {

    const hospital =
      hospitalData[
        hospitalSelect.value
      ];

    const department =
      this.value;


    // Reset day

    daySelect.innerHTML = `
      <option value="">
        দিন নির্বাচন করুন
      </option>
    `;

    daySelect.disabled = true;


    // Reset button

    searchButton.disabled =
      true;


    // Reset result

    resetResult();


    // No department selected

    if (
      !hospital ||
      !department
    ) {

      selectedDepartmentPreview.innerHTML =
        "🩺 বিভাগ নির্বাচন করলে প্রতীক এখানে দেখা যাবে";

      daySelect.innerHTML = `
        <option value="">
          প্রথমে বিভাগ নির্বাচন করুন
        </option>
      `;

      return;

    }


    // Department information

    const info =
      departmentData[department];


    // Show department preview

    selectedDepartmentPreview.innerHTML = `
      <span class="department-preview-icon">
        ${info.icon}
      </span>

      <strong>
        ${info.name}
      </strong>
    `;


    // Enable day selection

    daySelect.disabled =
      false;


    // Find available days

    weekOrder.forEach(
      function (day) {

        const departments =
          hospital.schedule[day];


        if (
          departments &&
          departments.includes(
            department
          )
        ) {

          const option =
            document.createElement(
              "option"
            );

          option.value =
            day;

          option.textContent =
            `📅 ${dayData[day].name}`;

          daySelect.appendChild(
            option
          );

        }

      }
    );

  }
);


// =========================================
// DAY SELECT
// =========================================

daySelect.addEventListener(
  "change",
  function () {

    searchButton.disabled =
      !this.value;

  }
);


// =========================================
// SEARCH BUTTON
// =========================================

searchButton.addEventListener(
  "click",
  function () {

    const hospitalKey =
      hospitalSelect.value;

    const department =
      departmentSelect.value;

    const day =
      daySelect.value;


    // Validate

    if (
      !hospitalKey ||
      !department ||
      !day
    ) {

      showWarning(
        "অনুগ্রহ করে হাসপাতাল, বিভাগ এবং দিন নির্বাচন করুন।"
      );

      return;

    }


    const hospital =
      hospitalData[hospitalKey];

    const departmentInfo =
      departmentData[department];

    const selectedDay =
      dayData[day].name;


    // Check availability

    const available =
      hospital.schedule[day] &&
      hospital.schedule[day].includes(
        department
      );


    // =====================================
    // RESULT FOUND
    // =====================================

    if (available) {

      showSuccess();


      resultContent.className =
        "result-content";


      resultContent.innerHTML = `

        <div class="compact-result">

          <div class="compact-result-top">

            <div class="compact-result-title">

              <span class="result-found-icon">
                ✓
              </span>

              <strong>
                আপনার অনুসন্ধানের ফলাফল
              </strong>

            </div>

            <span class="result-time">
              🕐 ${OPD_TIME}
            </span>

          </div>


          <div class="compact-result-info">

            <div class="compact-item">

              <span class="compact-icon">
                🏥
              </span>

              <div>

                <small>
                  হাসপাতাল
                </small>

                <strong>
                  ${hospital.name}
                </strong>

              </div>

            </div>


            <div class="compact-item">

              <span class="compact-icon">
                ${departmentInfo.icon}
              </span>

              <div>

                <small>
                  বিভাগ
                </small>

                <strong>
                  ${departmentInfo.name}
                </strong>

              </div>

            </div>


            <div class="compact-item">

              <span class="compact-icon">
                📅
              </span>

              <div>

                <small>
                  দিন
                </small>

                <strong>
                  ${selectedDay}
                </strong>

              </div>

            </div>

          </div>


          <div class="compact-result-bottom">

            <div>
              <span>ℹ️</span>
              সময়সূচি অনুযায়ী বিভাগটি নির্ধারিত দিনে পাওয়া যাবে।
            </div>

          </div>

        </div>

      `;

    }


    // =====================================
    // NO MATCH
    // =====================================

    else {

      showWarning();


      const nextDay =
        findNextAvailableDay(
          hospital,
          department,
          day
        );


      resultContent.className =
        "result-content";


      if (nextDay) {

        resultContent.innerHTML = `

          <div class="suggestion-box">

            <strong>
              ⚠️ ${departmentInfo.icon}
              ${departmentInfo.name}
              বিভাগটি ${selectedDay}-এ নেই।
            </strong>

            <br><br>

            📅 পরবর্তী নির্ধারিত দিন:

            <strong>
              ${dayData[nextDay].name}
            </strong>

            <br><br>

            🕐 সময়:
            <strong>
              ${OPD_TIME}
            </strong>

          </div>

        `;

      }

    }

  }
);


// =========================================
// FIND NEXT AVAILABLE DAY
// =========================================

function findNextAvailableDay(
  hospital,
  department,
  selectedDay
) {

  const selectedIndex =
    weekOrder.indexOf(
      selectedDay
    );


  if (selectedIndex === -1) {

    return null;

  }


  // Search after selected day

  for (
    let i = selectedIndex + 1;
    i < weekOrder.length;
    i++
  ) {

    const day =
      weekOrder[i];


    if (
      hospital.schedule[day] &&
      hospital.schedule[day].includes(
        department
      )
    ) {

      return day;

    }

  }


  // Search from beginning of next week

  for (
    let i = 0;
    i <= selectedIndex;
    i++
  ) {

    const day =
      weekOrder[i];


    if (
      hospital.schedule[day] &&
      hospital.schedule[day].includes(
        department
      )
    ) {

      return day;

    }

  }


  return null;

}


// =========================================
// RESULT STATUS
// =========================================

function showSuccess() {

  resultStatus.textContent =
    "✓ পাওয়া গেছে";

  resultStatus.className =
    "status success";

}


function showWarning(
  message
) {

  resultStatus.textContent =
    "⚠️ তথ্য মিলেনি";

  resultStatus.className =
    "status warning";


  if (message) {

    resultContent.className =
      "result-content";

    resultContent.innerHTML = `

      <div class="suggestion-box">
        ${message}
      </div>

    `;

  }

}


// =========================================
// RESET RESULT
// =========================================

function resetResult() {

  resultStatus.textContent =
    "অপেক্ষমান";

  resultStatus.className =
    "status neutral";


  resultContent.className =
    "result-placeholder";


  resultContent.innerHTML = `

    <div class="placeholder-icon">
      🏥
    </div>

    <p>
      হাসপাতাল, বিভাগ এবং দিন নির্বাচন করে
      <strong>সময়সূচি দেখুন</strong>
      বাটনে চাপ দিন।
    </p>

  `;

}


// =========================================
// CALL BUTTON
// =========================================

function enableCallButton(
  phoneNumber
) {

  callButton.href =
    "tel:" + phoneNumber.replace(
      /[^0-9+]/g,
      ""
    );


  callButton.classList.remove(
    "disabled"
  );


  callButton.setAttribute(
    "aria-disabled",
    "false"
  );

}


function disableCallButton() {

  callButton.href =
    "#";


  callButton.classList.add(
    "disabled"
  );


  callButton.setAttribute(
    "aria-disabled",
    "true"
  );

}


// =========================================
// HOSPITAL DOOR ANIMATION
// =========================================

function openHospitalDoor() {

  if (!hospitalDoor) {
    return;
  }

  hospitalDoor.classList.add(
    "open"
  );

}


function closeHospitalDoor() {

  if (!hospitalDoor) {
    return;
  }

  hospitalDoor.classList.remove(
    "open"
  );

}


// =========================================
// DOOR SYNCHRONIZATION
// =========================================

/*
  Person 2 এবং Person 4-এর CSS animation
  cycle-এর সাথে দরজা synchronize করা হয়েছে।

  CSS person animation cycle: 18 seconds

  Person 2:
  - Door-এর সামনে আসে প্রায় 23%
  - প্রবেশের সময় দরজা খুলবে
  - ব্যক্তি অদৃশ্য হওয়ার পর বন্ধ হবে
  - বের হওয়ার সময় আবার খুলবে

  Person 4:
  - CSS animation-delay: 9 seconds
  - একই cycle পরে শুরু হবে
*/


const ANIMATION_CYCLE =
  18000;


// Person 2 door schedule

function personTwoDoorCycle() {

  // Person reaches door
  setTimeout(
    openHospitalDoor,
    4100
  );


  // Person enters, door closes
  setTimeout(
    closeHospitalDoor,
    5200
  );


  // Person comes out, door opens
  setTimeout(
    openHospitalDoor,
    10800
  );


  // Person leaves, door closes
  setTimeout(
    closeHospitalDoor,
    12000
  );

}


// Person 4 door schedule

function personFourDoorCycle() {

  // Person 4 reaches door
  setTimeout(
    openHospitalDoor,
    13100
  );


  // Person enters, door closes
  setTimeout(
    closeHospitalDoor,
    14200
  );


  /*
    Person 4-এর বের হওয়ার সময়
    next cycle-এর শুরুতে overlap না হওয়ার জন্য
    দরজা আবার খুলবে
  */

  setTimeout(
    openHospitalDoor,
    17000
  );


  setTimeout(
    closeHospitalDoor,
    17900
  );

}


// Start synchronized door animation

function startDoorAnimation() {

  if (!hospitalDoor) {
    return;
  }


  // Ensure initially closed

  closeHospitalDoor();


  // Run Person 2 cycle

  personTwoDoorCycle();


  // Run Person 4 cycle

  personFourDoorCycle();


  // Repeat full cycle

  setInterval(
    function () {

      personTwoDoorCycle();

      personFourDoorCycle();

    },
    ANIMATION_CYCLE
  );

}


// =========================================
// INITIAL STATE
// =========================================

departmentSelect.disabled =
  true;

daySelect.disabled =
  true;

searchButton.disabled =
  true;

disableCallButton();


// Start door animation after page loads

window.addEventListener(
  "load",
  function () {

    startDoorAnimation();

  }
);