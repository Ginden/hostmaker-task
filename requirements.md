## Description of task
For​ ​ this​ ​ exercise:
* Please​ ​ use​ ​ any​ ​ choice​ ​ of​ ​ technology.​
** We​ ​ would​ ​ prefer​ ​ it​ ​ to​ ​ be​ ​ Node.js​ ​ and​ ​ RDBMS​ ​ (mysql​ ​ or​ ​ postgres).
* Please​ ​ use​ ​ any​ ​ choice​ ​ of​ ​ architecture​ ​ pattern​ ​ – ​ ​ either​ ​ a ​ ​ standard​ ​ server​ ​ side​ ​ rendered​ ​ web-page​ ​ or Web-Api​ ​ that​ ​ is​ ​ used​ ​ by​ ​ JavaScript​ ​ on​ ​ the​ ​ page.​ ​ We​ ​ would​ ​ like​ ​ to​ ​ see​ ​ if​ ​ you​ ​ can​ ​ reason​ ​ your​ ​ choice.
* Please​ ​ try​ ​ do​ ​ have​ ​ your​ ​ code​ ​ unit-tested​ ​ or​ ​ have​ ​ some​ ​ form​ ​ of​ ​ automated​ ​ testing​ ​ in​ ​ it.
* Please​ ​ do​ ​ use​ ​ a ​ ​ version-control​ ​ system​ ​ (preferably​ ​ git​ ​ --​ ​ you​ ​ can​ ​ do​ ​ share​ ​ it​ ​ over​ ​ bitbucket​ ​ or​ ​ just​ ​ zip​  the whole​ ​ folder​ ​ including​ ​ the `.git`​ ​ folder)
* Attached​ ​ is​ ​ the​ ​ json​ ​ file​ ​ with​ ​ the​ ​ data​ ​ in.​ ​ (exerciseData_backendExercise_final.json)

**Background**:​ ​ As​ ​ an​ ​ Account​ ​ manager​ ​ at​ ​ HostMaker​ ​ I ​ ​ want​ ​ to​ ​ be​ ​ able​ ​ to​ ​ manage​ ​ all​ ​ property​ ​ details.

### Story
**Story​ ​ 1**:​ ​ As​ ​ an​ ​ Account​ ​ manager​ ​ at​ ​ HostMaker​ ​ I ​ ​ want​ ​ to​ ​ be​ ​ able​ ​ to​ ​ Get/Create/Update/Delete​ ​ the​ ​ property
details.
For​ ​ this​ ​ exercise​ ​ the​ ​ property​ ​ details​ ​ have​ ​ following​ ​ fields:
1. Host (Required)
2. Address
  * Line1​ ​ (Required)
  * Line2​ ​ (Optional)
  * Line3​ ​ (Optional)
  * Line4​ ​ (Required)
  * Postcode​ ​ (Required)
  * City​ ​ (Required)
  * Country​ ​ (Required)
3. NumberOfBedrooms​ ​ (mandatory​ ​ &>=0​)
4. NumberOfBathrooms​ ​ (mandatory​ ​ &>0)
5. AirbnbID​ ​ ​ (must​ ​ have​ ​ a ​ ​ valid​ ​ airbnb_id.​ ​ Example:​ ​ 2354700​ ​ is​ ​ a ​ ​ valid​ ​ airbnb-id​ ​ because​ ​ when​ ​ we​ ​ go
to​ ​ the​ ​ link.​ ​ We​ ​ get​ ​ a ​ ​ https://www.airbnb.co.uk/rooms/2354700,​ ​ 200-OK​ ​ response.​ ​ Whereas​ ​ if​ ​ we
go​ ​ to​ ​ something​ ​ random​ ​ like​ ​ https://www.airbnb.co.uk/rooms/242424242424​ ​ - ​ ​ we​ ​ get​ ​ 302.​ ​ So
ideally​ ​ we​ ​ would​ ​ like​ ​ the​ ​ server​ ​ to​ ​ ping​ ​ airbnb​ ​ and​ ​ check​ ​ if​ ​ it​ ​ exists.​ ​ Airbnb​ ​ does​ ​ block​ ​ repeated
http​ ​ requests​ ​ from​ ​ same​ ​ IP.​ ​ So​ ​ might​ ​ want​ ​ to​ ​ consider​ ​ a ​ ​ strategy​ ​ to​ ​ handle​ ​ that.​ ​ AirbnbId's​ ​ dont
change​ ​ that​ ​ often.​ ​ )
6. IncomeGenerated​ ​ (Required​ ​ & ​>0)

We​ ​ need​ ​ to​ ​ publish​ ​ restful​ ​ Api/s​ ​ to​ ​ manage​ ​ this​ ​ data.​ ​ For​ ​ creating​ ​ and​ ​ updating​ ​ properties,​ ​ we​ ​ need​ ​ to
make​ ​ sure​ ​ the​ ​ persisted​ ​ data​ ​ is​ ​ valid.​ ​ So​ ​ ensure​ ​ that​ ​ business​ ​ rules​ ​ are​ ​ respected.

**Bonus​ ​ Story**:
We​ ​ would​ ​ like​ ​ to​ ​ see​ ​ the​ ​ various​ ​ version​ ​ of​ ​ the​ ​ properties​ ​ are​ ​ persisted​ ​ in​ ​ the​ ​ database.​ ​ So​ ​ that​ ​ we​ ​ know
how​ ​ the​ ​ property​ ​ data​ ​ evolved.****