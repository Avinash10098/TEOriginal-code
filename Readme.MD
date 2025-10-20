Record Type Label: CRM Case
Record Type Name: CRM_Case (automatically aayega)
Description: Cases from CRM team email
Active: ✅ Tick karo (bahut important!)
```

6. **Next** click karo
7. **"Apply one layout to all profiles"** select karo
8. **Save** button dabao

**Repeat karo AM ke liye:**
- Same steps
- Bas naam change karo: **AM Case** aur **AM_Case**

**Done!** ✅ Ab tumhare paas 2 Record Types hain!

---

### **STEP 2: Email-to-Case Setup** 📧

**Email-to-Case kya hai?**
- Yeh feature jo email ko Case me convert karta hai
- Jaise magic! Email aaya → Case ban gaya

**Kaise Enable Kare:**

1. **Setup** → Search box me **"Email-to-Case"**
2. **Edit** button click karo
3. **"Enable Email-to-Case"** checkbox ko tick karo ✅
4. **Save** karo

**Routing Address Banana:**

Routing Address matlab - konse email address se Case banenge

1. **Setup** → Search **"Routing Addresses"**
2. **New** button click karo

**CRM ke liye:**
```
Routing Name: CRM Cases (kuch bhi naam do)
Email Address: crm@yourcompany.com (tumhara actual email)
Case Origin: Email (dropdown se select karo)
Active: ✅ Tick karo
```
3. **Save** karo

**AM ke liye bhi same repeat karo:**
```
Routing Name: AM Cases
Email Address: am@yourcompany.com
Active: ✅ Tick
```

**Done!** ✅ Ab Salesforce ko pata hai ki in emails se Cases banane hain!

---

### **STEP 3: Flow Banana (MAIN MAGIC)** ✨

**Flow kya hai?**
- Flow ek **automation** hai
- Jab Case banta hai, yeh automatically kaam karta hai
- Jaise robot jo khud kaam karta hai!

**Flow Kaise Banaye:**

1. **Setup** → Search **"Flows"**
2. **New Flow** button click karo
3. **Record-Triggered Flow** select karo
4. **Next** click karo

**Ab yeh bharo (Dhyan se!):**
```
Object: Case (dropdown se select karo)
Trigger the Flow When: A record is created (select karo)
Run the Trigger: Before the record is saved (IMPORTANT!)
Set Entry Conditions: All Conditions Are Met (AND)
```

**Condition add karo:**
- Click **"Add Condition"**
- Field: **SuppliedEmail**
- Operator: **Is Null**
- Value: **False** (matlab email hona chahiye)

5. **Optimize the Flow For**: **Fast Field Updates** select karo
6. **Done** click karo

---

### **STEP 4: Decision Element Add Karo** 🤔

Decision matlab - **if-else** jaise programming me!

1. Flow screen pe **"+"** button click karo
2. **Decision** select karo

**Details bharo:**
```
Label: Check Which Email
API Name: Check_Which_Email
Description: Check if email is from CRM or AM
```

**Outcome 1 (CRM ka):**
1. **New Outcome** button already hoga
2. **Label**: CRM Email
3. **Outcome API Name**: CRM_Email
4. **Condition Requirements**: All Conditions Are Met (AND)

**Add Condition:**
- **Resource**: {!$Record.SuppliedEmail}
- **Operator**: Contains
- **Value**: **crm@yourcompany.com** (tumhara CRM email)

**Outcome 2 (AM ka):**
1. **New Outcome** button click karo (+ icon)
2. **Label**: AM Email
3. **Outcome API Name**: AM_Email
4. Same condition add karo bas email change karo: **am@yourcompany.com**

5. **Done** button click karo

---

### **STEP 5: Update Record Type (IMPORTANT!)** 🎯

Ab hum batayenge ki kis email ka kaunsa Record Type lagana hai.

**CRM ke liye:**

1. Decision element ke **CRM Email** outcome pe hover karo
2. **"+"** button dikhega, click karo
3. **Update Records** select karo

**Details bharo:**
```
Label: Set CRM Record Type
API Name: Set_CRM_Record_Type
Description: Assign CRM Record Type
```

**How to Find Records to Update:**
- **Use the Case record that triggered the flow** select karo

**Set Field Values:**
1. **Field**: RecordTypeId (search karo)
2. **Value**: Yahan trick hai! 

**Record Type ID kaise paye:**
- Setup → Object Manager → Case → Record Types
- **CRM Case** pe click karo
- URL dekho browser me, last me ID hogi (something like 0123456789ABCDE)
- **Copy karo yeh ID!**
- Flow me paste karo

3. **Done** click karo

**AM ke liye bhi same:**
1. Decision ke **AM Email** outcome pe connect karo
2. Update Records element add karo
3. AM Case ki Record Type ID lagao

---

### **STEP 6: Flow Save & Activate Karo** 💾

1. **Save** button click karo
```
Flow Label: Set Record Type Based on Email
Flow API Name: Set_Record_Type_Based_on_Email
```
2. **Save** karo
3. **Activate** button click karo (bahut important - warna kaam nahi karega!)

**Done!** ✅ Yeh master flow ready hai!

---

### **STEP 7: Team Specific Flows Banana** 👥

Ab alag alag flows banao har team ke liye.

**CRM Team Flow:**

1. **New Flow** → **Record-Triggered Flow**
2. **Object**: Case
3. **Trigger**: A record is created or updated
4. **Entry Conditions**: 
   - Field: **Record Type ID**
   - Operator: **Equals**
   - Value: (CRM Case ki Record Type ID paste karo)

**Alternative (Easy way):**
   - Field: **RecordType.DeveloperName**
   - Operator: **Equals**  
   - Value: **CRM_Case**

5. Ab apni **CRM team ki logic** add karo:
   - Field updates
   - Validations
   - Email alerts
   - Jo bhi chahiye!

6. Save & Activate karo:
```
Flow Label: CRM Team - All Logic
```

**AM Team Flow:**
- Same steps
- Bas entry condition me AM_Case lagao
- AM ki logic add karo

---

## **Testing Kaise Kare** 🧪

### **Test 1: CRM Email**
1. **crm@yourcompany.com** se email bhejo Salesforce email address pe
2. Salesforce me Cases tab kholo
3. Naya Case dekhoge
4. Case kholo aur **Record Type** dekho - **CRM Case** hona chahiye ✅
5. CRM flow chalna chahiye

### **Test 2: AM Email**
1. **am@yourcompany.com** se email bhejo
2. Case open karo
3. Record Type = **AM Case** hona chahiye ✅
4. AM flow chalna chahiye

---

## **Agar Kaam Nahi Kara To** 🔧

### **Check List:**

1. ✅ Record Types active hain?
   - Setup → Object Manager → Case → Record Types → Check Active

2. ✅ Email-to-Case enabled hai?
   - Setup → Email-to-Case → Check enabled

3. ✅ Routing Addresses active hain?
   - Setup → Routing Addresses → Check Active checkbox

4. ✅ Flow activate hai?
   - Setup → Flows → Tumhare flow pe → Status = Active hona chahiye

5. ✅ Record Type ID sahi hai?
   - Dobara check karo copy kiya tha correctly

### **Debug Kaise Kare:**

1. **Setup** → Search **"Debug Logs"**
2. **New** button → Apna naam/user add karo
3. Email bhejo test ke liye
4. Wapas Debug Logs me aao
5. Latest log kholo
6. Error dikha to samjh jayega problem kahan hai

---

## **Visual Summary (Diagram)** 📊
```
Email Aaya
    ↓
Email-to-Case (Case Create Hota Hai)
    ↓
Flow 1: Check Email Address
    ↓
    ├─→ CRM email? → Record Type = CRM Case
    │                     ↓
    │                 Flow 2: CRM Logic Chale
    │
    └─→ AM email? → Record Type = AM Case
                          ↓
                      Flow 3: AM Logic Chale
