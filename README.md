# Exercise: Three Brands, One Hub

Exercise code for the lesson **Exercise: Three Brands, One Hub** in the course *Design Patterns, Demystified* on [ask-codey.com](https://www.ask-codey.com).

## The ticket

> **From:** Maya, and the HomeBase phone team
>
> 1. **Maya's Bolt lock and Tuneo speaker are in.** "Good morning" should unlock the Bolt front door and play the news on the Tuneo kitchen speaker, and "leaving home" should lock the door and stop the speaker, the way both routines already switch the Lumo lights. The setup screen adds them with `addBolt(...)` and `addTuneo(...)`.
> 2. **Glint lights arrive next month.** Glint's team will hand us their lights already fitted to the hub's own `Light` promise (`on()` and `off()`), and the setup screen will add them with `addLight(...)`. The routines must work with them without anyone editing the hub again.
> 3. **The phone team's new remote screen** sends a command with a brand's kit: `sendWith(kit, device, command)`. A kit hands out that brand's connection, command format and status reader: `LumoKit`, `BoltKit` and `TuneoKit`, and next month Glint's own kit. Today the remote picks each of the three parts by the brand's name, in three separate places, and the three choices must always agree.
>
> Everything that works today has to keep working, and the brands' own code can't change.

`addBolt`, `addTuneo`, `addLight`, `sendWith` and the three kits are already there, because other code calls them, but they don't do anything yet.

## Pick your language

The same exercise is here in five languages. Work in the folder for the language you set up; you only need one.

| Folder | The brands' code (don't change it) | The hub and the remote (yours) | The tests |
|---|---|---|---|
| `csharp/` | `ThreeBrands/Brands.cs` | `ThreeBrands/Hub.cs`, `ThreeBrands/Remote.cs` | `ThreeBrands.Tests/ThreeBrandsTests.cs` |
| `java/` | `src/main/java/LumoLight.java`, `BoltLock.java`, `TuneoSpeaker.java` | `src/main/java/Hub.java`, `Remote.java`, the three kits and the rest | `src/test/java/ThreeBrandsTest.java` |
| `python/` | `brands.py` | `hub.py`, `remote.py` | `test_three_brands.py` |
| `javascript/` | `brands.js` | `hub.js`, `remote.js` | `three-brands.test.js` |
| `typescript/` | `brands.ts` | `hub.ts`, `remote.ts` | `three-brands.test.ts` |

The names follow each language's style: `AddBolt` in C#, `add_bolt` in Python, `addBolt` in the others, and the same for `SendWith`, `send_with` and `sendWith`.

Every folder also has a small demo program that sets up Maya's kitchen and front door, runs both routines, and sends the front door one command each way. You don't need to change the brands' code, the tests or the demo.

## Run it and check your work

Open your language's folder in VS Code (**File > Open Folder**), then open its terminal (**Terminal > New Terminal**) and run these commands there.

**C#**

```bash
dotnet run --project ThreeBrands
dotnet test
```

**Java** (the Maven Wrapper downloads Maven the first time, so the first run takes a minute)

```bash
java src/main/java/Demo.java
./mvnw test
```

On Windows in PowerShell, write `.\mvnw test` instead of `./mvnw test`.

**Python** (once: make a virtual environment and install pytest into it)

```bash
python -m venv .venv
```

Then turn it on: `.venv\Scripts\Activate.ps1` in PowerShell on Windows, or `source .venv/bin/activate` on macOS (where the command is `python3`, not `python`). Then:

```bash
pip install -r requirements.txt
python demo.py
python -m pytest
```

**JavaScript**

```bash
node demo.js
npm test
```

**TypeScript** (once: `npm install`, which installs TypeScript)

```bash
node demo.ts
npm test
```

At first, 2 tests pass and 5 fail. The 2 that pass are what the hub does today: keep them green the whole time, and run the tests after every small change. The 5 that fail are the ticket. A failing test's message starts with **Not yet:** (or **Keep this working:** if you broke something that worked) and says what it expected.

## When you're done

All 7 tests are green, and the demo prints:

```text
Good morning, then leaving home:
kitchen light (Lumo): power on, power off
front door (Bolt): RELEASED, ENGAGED
kitchen speaker (Tuneo): streaming https://tuneo.example/news, halted
By brand name: front door: locked
With Bolt's kit: front door: locked
```

<details>
<summary>Stuck?</summary>

- **For the routines:** the hub keeps Lumo lights and calls Lumo's own `setPower`, so a device that speaks another brand's words can't join. Give each brand a small class that keeps the hub's promise on the outside and says it in the brand's words inside (an **adapter**). Then the hub keeps `Light`s, `Lock`s and `Speaker`s, and `addLumo`, `addBolt` and `addTuneo` each wrap the brand's device in its adapter. (*Adapter: The Interpreter Between Two Strangers*.)
- **For the remote:** three functions each pick one part by the brand's name, and nothing makes them agree. Let each brand's kit make all three of its parts (an **abstract factory**), have `sendWith` ask the kit it's handed for all three, and have `send` look up the brand's kit in a dictionary and pass it to `sendWith`. (*Abstract Factory: Parts That Must Match*.)

</details>

## Hand it in

When it works, push your solution to a public repo of your own on GitHub, then paste that repo's address into **Submit your exercise** on the lesson page at [ask-codey.com](https://www.ask-codey.com). That's what completes the lesson. The lesson page shows the Git commands, step by step.
