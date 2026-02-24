let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

let noJobs = document.querySelector('#no-jobs');

let total = document.querySelector("#total");
let interviewCount = document.querySelector("#interviewCount");
let rejectedCount = document.querySelector("#rejectedCount");
let jobs = document.querySelector('#jobs');

const allFilterBtn = document.querySelector('#all-filter-btn');
const interviewFilterBtn = document.querySelector('#interview-filter-btn');
const rejectedFilterBtn = document.querySelector('#rejected-filter-btn');

const allCardSection = document.querySelector('#allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.querySelector('#filtered-section');

function calculateCount() {
    total.innerText = allCardSection.children.length;
    jobs.innerText = allCardSection.children.length;

    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

}
calculateCount();

function toggleStyle(id) {

    //if any button has blue bg then remove
    allFilterBtn.classList.remove('bg-blue-700', 'text-white');
    interviewFilterBtn.classList.remove('bg-blue-700', 'text-white');
    rejectedFilterBtn.classList.remove('bg-blue-700', 'text-white');

    //adding white bg for all
    allFilterBtn.classList.add('bg-white', 'text-gray-600');
    interviewFilterBtn.classList.add('bg-white', 'text-gray-600');
    rejectedFilterBtn.classList.add('bg-white', 'text-gray-600');

    const selected = document.getElementById(id);

    currentStatus = id;

    //adding blue bg for current button
    selected.classList.remove('bg-white', 'text-gray-600');
    selected.classList.add('bg-blue-700', 'text-white');

    noJobs.classList.add('hidden');
    filterSection.innerHTML = '';

    if (id == 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');

        jobs.innerText = `${interviewList.length} of ${allCardSection.children.length}`;

        if (interviewList.length == 0) {
            noJobs.classList.remove('hidden');
            filterSection.innerHTML = '';
        }
        else {
            noJobs.classList.add('hidden');
            renderInterview();
        }


    }
    else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');

        jobs.innerText = allCardSection.children.length;

        noJobs.classList.add('hidden');
    }
    else if (id == 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');

        jobs.innerText = `${rejectedList.length} of ${allCardSection.children.length}`;

        if (rejectedList.length === 0) {
            noJobs.classList.remove('hidden');
            filterSection.innerHTML = '';
        }

        else {
            noJobs.classList.add('hidden');
            renderRejected();
        }
    }

}

mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {

        const parentNode = event.target.parentNode.parentNode;
        const companyName = parentNode.querySelector('.companyName').innerText;
        const positionName = parentNode.querySelector('.positionName').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const status = parentNode.querySelector('.status').innerText;
        const notes = parentNode.querySelector('.notes').innerText;

        const statusUpdate = parentNode.querySelector('.status');
        statusUpdate.innerText = 'INTERVIEW';
        statusUpdate.className = "status sm:w-1/2 lg:max-w-[15%] text-green-500 bg-green-100 border border-green-500 rounded-md px-4 py-2";

        const cardInfo = {
            companyName,
            positionName,
            salary,
            status: 'INTERVIEW',
            notes
        }

        const interviewExist = interviewList.find(item => item.companyName == cardInfo.companyName);



        if (!interviewExist) {
            interviewList.push(cardInfo);
        }

        rejectedList = rejectedList.filter(item => item.companyName != cardInfo.companyName);

        calculateCount();

        if (currentStatus == 'rejected-filter-btn') {
            // renderRejected();
            if (rejectedList.length === 0) {
                filterSection.innerHTML = '';
                noJobs.classList.remove('hidden');
            } else {
                noJobs.classList.add('hidden');
                renderRejected();
            }
        }
    }
    else if (event.target.classList.contains('rejected-btn')) {
        const parentNode = event.target.parentNode.parentNode;
        const companyName = parentNode.querySelector('.companyName').innerText;
        const positionName = parentNode.querySelector('.positionName').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const status = parentNode.querySelector('.status').innerText;
        const notes = parentNode.querySelector('.notes').innerText;

        const statusUpdate = parentNode.querySelector('.status');
        statusUpdate.innerText = 'REJECTED';
        statusUpdate.className = "status sm:w-1/2 lg:max-w-[15%] text-red-500 bg-red-100 border border-red-500 rounded-md px-4 py-2";

        const cardInfo = {
            companyName,
            positionName,
            salary,
            status: 'REJECTED',
            notes
        }

        const rejectedExist = rejectedList.find(item => item.companyName == cardInfo.companyName);



        if (!rejectedExist) {
            rejectedList.push(cardInfo);
        }

        interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName);

        if (currentStatus == 'interview-filter-btn') {
            // renderInterview();
            if (interviewList.length === 0) {
                filterSection.innerHTML = '';
                noJobs.classList.remove('hidden');
            } else {
                noJobs.classList.add('hidden');
                renderInterview();
            }
        }

        calculateCount();
    }

    else if (event.target.closest('.delete')) {

        const card = event.target.closest('.card');

        const companyName = card.querySelector('.companyName').innerText;
        interviewList = interviewList.filter(item => item.companyName !== companyName);
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);

        card.remove();

        calculateCount();

        if (currentStatus === 'interview-filter-btn') {

            jobs.innerText = `${interviewList.length} of ${total.innerText}`;

            if (interviewList.length === 0) {
                filterSection.innerHTML = '';
                noJobs.classList.remove('hidden');
            } else {
                renderInterview();
            }

        }

        else if (currentStatus === 'rejected-filter-btn') {

            jobs.innerText = `${rejectedList.length} of ${total.innerText}`;

            if (rejectedList.length === 0) {
                filterSection.innerHTML = '';
                noJobs.classList.remove('hidden');
            } else {
                renderRejected();
            }

        }

        else {
            jobs.innerText = `${allCardSection.children.length}`;
        }
    }

})


// -------renderInterview() Function----------

function renderInterview() {
    filterSection.innerHTML = '';

    for (let interview of interviewList) {

        // console.log(interview);
        let div = document.createElement('div');
        div.className = "card flex justify-between bg-white p-4 my-4 rounded-md";
        div.innerHTML = `
        <!-- main part 1 -->
                <div class="space-y-6">
                    <!-- part 1  -->
                    <div>
                        <p class="companyName font-bold">${interview.companyName}</p>
                        <p class="positionName text-gray-400">${interview.positionName}</p>
                    </div>

                    <!-- part 2  -->
                    <div>
                        <p class="salary text-gray-400">${interview.salary}</p>
                    </div>

                    <!-- part 3  -->
                    <p class="status sm:w-1/2 lg:max-w-[15%] text-green-500 bg-green-100 border border-green-500 rounded-md px-4 py-2">${interview.status}</p>
                    <p class="notes">${interview.notes}</p>

                    <div class="flex gap-5">
                        <button
                            class="interview-btn text-green-500 border border-green-500 rounded-md px-4 py-2">INTERVIEW</button>
                        <button
                            class="rejected-btn text-red-500 border border-red-500 rounded-md px-4 py-2">REJECTED</button>
                    </div>

                </div>
                <!-- main part 2 -->
                <div>
                    <button class="delete"><img src="Group 1.png" alt="" class="w-16 h-12 sm:w-1 sm:h-12 lg:w-10 lg:h-10"></button>
                </div>`

        filterSection.appendChild(div);
    }
}

// -------renderRejected() Function----------

function renderRejected() {
    filterSection.innerHTML = '';

    for (let rejected of rejectedList) {

        // console.log();
        let div = document.createElement('div');
        div.className = "card flex justify-between bg-white p-4 my-4 rounded-md";
        div.innerHTML = `
        <!-- main part 1 -->
                <div class="space-y-6">
                    <!-- part 1  -->
                    <div>
                        <p class="companyName font-bold">${rejected.companyName}</p>
                        <p class="positionName text-gray-400">${rejected.positionName}</p>
                    </div>

                    <!-- part 2  -->
                    <div>
                        <p class="salary text-gray-400">${rejected.salary}</p>
                    </div>

                    <!-- part 3  -->
                    <p class="status sm:w-1/2 lg:max-w-[15%] text-red-500 bg-red-100 border border-red-500 rounded-md px-4 py-2">${rejected.status}</p>
                    <p class="notes">${rejected.notes}</p>

                    <div class="flex gap-5">
                        <button
                            class="interview-btn text-green-500 border border-green-500 rounded-md px-4 py-2">INTERVIEW</button>
                        <button
                            class="rejected-btn text-red-500 border border-red-500 rounded-md px-4 py-2">REJECTED</button>
                    </div>

                </div>
                <!-- main part 2 -->
                <div>
                    <button class="delete"><img src="Group 1.png" alt="" class="w-16 h-12 sm:w-1 sm:h-12 lg:w-10 lg:h-10"></button>
                </div>`

        filterSection.appendChild(div);
    }
}