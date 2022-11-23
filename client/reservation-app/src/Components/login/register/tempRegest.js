<div class="container">
    <div class="title">Find Table</div>
    <form action="#">
        <div class="user__details">
            <div class="input__box">
                <span class="details">Full Name</span>
                <input type="text" className="formElement" name="name" placeholder="..." onChange={(e) => setName(e.target.value)} required />
            </div>
            <div class="input__box">
                <span class="details">Party Size </span>
                <input type="number" className="formElement" name="partySize" max="8" min="1" defaultValue="0" onChange={(e) => setPartySize(e.target.value)} required />
            </div>
            <div class="input__box">
                <span class="details">Email</span>
                <input type="text" className="formElement" name="email" placeholder="..." onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div class="input__box">
                <span class="details">Phone Number</span>
                <input type="text" className="formElement" name="phone" placeholder="..." onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div class="input__box">
                <span class="details">Party Date</span>
                <input type="date" className="formElement" name="partyDate" onChange={(e) => setPartyDate(e.target.value)} min="2022-11-19" required />
            </div>
            <div class="input__box">
                <span class="details">Party Time</span>
                <input type="time" className="formElement" name="partyTime" step="3600" onChange={(e) => setPartyTime(e.target.value)} required />
            </div>

        </div>
        <div class="gender__details">
            <input type="radio" name="gender" id="dot-1" />
            <input type="radio" name="gender" id="dot-2" />
            <input type="radio" name="gender" id="dot-3" />
            <span class="gender__title">Gender</span>
            <div class="category">
                <label for="dot-1">
                    <span class="dot one"></span>
                    <span>Male</span>
                </label>
                <label for="dot-2">
                    <span class="dot two"></span>
                    <span>Female</span>
                </label>
                <label for="dot-3">
                    <span class="dot three"></span>
                    <span>Prefer not to say</span>
                </label>
            </div>
        </div>
        <button type="submit" className="buttonStyle" value="Submit" onClick={insertBookings}>Submit Booking</button>
    </form>
</div>