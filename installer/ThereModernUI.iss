; ThereModernUI - ThereModernUI.iss
; Inno Setup 6 script for the installer / updater.
; Author: DANKIES
;
; Installs into the player's There folder. Anything we overwrite gets backed up
; once (a newer setup over an old one won't back up our own files), and the
; uninstaller puts it all back. Running a newer setup over the top is the update.
;
; Build with build-installer.ps1, the setup ends up in dist

#define AppName "ThereModernUI"
; build-installer.ps1 passes the real version in from Resources\tmui\update.js
#ifndef AppVersion
  #define AppVersion "0.0.0-dev"
#endif
#define AppPublisher "DANKIES"
#define AppURL "https://github.com/Kronzy0nButtons/ThereModernUI"

[Setup]
AppId={{6E4B2C1A-7F3D-4B8E-9A21-5C0D7E9F3A44}
AppName={#AppName}
AppVersion={#AppVersion}
AppVerName={#AppName} {#AppVersion}
AppPublisher={#AppPublisher}
AppPublisherURL={#AppURL}
DefaultDirName={code:GuessThereDir}
AppendDefaultDirName=no
DirExistsWarning=no
UsePreviousAppDir=yes
DisableProgramGroupPage=yes
DisableReadyPage=no
PrivilegesRequired=lowest
PrivilegesRequiredOverridesAllowed=dialog commandline
UninstallFilesDir={app}\ThereModernUI\uninstall
UninstallDisplayName={#AppName}
OutputDir=..\dist
OutputBaseFilename={#AppName}-Setup-{#AppVersion}
Compression=lzma2
SolidCompression=yes
WizardStyle=modern
LicenseFile=..\licenses\NOTICE.txt
; TMUI artwork, one image per Windows scaling level so it stays sharp
SetupIconFile=art\tmui.ico
UninstallDisplayIcon={uninstallexe}
WizardImageFile=art\wizard-164.bmp,art\wizard-205.bmp,art\wizard-246.bmp,art\wizard-287.bmp,art\wizard-328.bmp,art\wizard-369.bmp,art\wizard-410.bmp
WizardSmallImageFile=art\small-55.bmp,art\small-64.bmp,art\small-69.bmp,art\small-83.bmp,art\small-92.bmp,art\small-110.bmp,art\small-138.bmp

[Messages]
SelectDirLabel3=Select your There client folder (the one that contains There.exe).
SelectDirBrowseLabel=To continue, click Next. To pick a different folder, click Browse.

[Files]
; the UI pages, minus the per-user photo cache
Source: "..\Resources\*"; DestDir: "{app}\Resources"; Excludes: "catalogcache.json"; Flags: recursesubdirs ignoreversion; BeforeInstall: BackupExisting
; our BrowserProxy build (clothing photos)
Source: "..\browserproxy\BrowserProxy.modui.dll"; DestDir: "{app}"; DestName: "BrowserProxy.dll"; Flags: ignoreversion; BeforeInstall: BackupExisting
; our FlashProxy build (F-keys, Action Mode keys)
Source: "..\flashproxy\FlashProxy.modui.dll"; DestDir: "{app}"; DestName: "FlashProxy.dll"; Flags: ignoreversion; BeforeInstall: BackupExisting
; licences
Source: "..\licenses\*"; DestDir: "{app}\ThereModernUI\licenses"; Flags: ignoreversion

[Code]
const
  BackupSub = 'ThereModernUI\backup';

{ ---------- find the There folder ---------- }

function GuessThereDir(Param: String): String;
var
  Candidates: TArrayOfString;
  I: Integer;
begin
  SetArrayLength(Candidates, 7);
  Candidates[0] := ExpandConstant('{autopf32}\There\ThereClient');
  Candidates[1] := ExpandConstant('{autopf32}\There');
  Candidates[2] := ExpandConstant('{autopf}\There\ThereClient');
  Candidates[3] := ExpandConstant('{autopf}\There');
  Candidates[4] := ExpandConstant('{sd}\Makena2\There\ThereClient');
  Candidates[5] := ExpandConstant('{sd}\Makena\There\ThereClient');
  Candidates[6] := ExpandConstant('{sd}\There\ThereClient');
  for I := 0 to GetArrayLength(Candidates) - 1 do
    if FileExists(Candidates[I] + '\There.exe') then
    begin
      Result := Candidates[I];
      Exit;
    end;
  Result := ExpandConstant('{autopf32}\There');
end;

function NextButtonClick(CurPageID: Integer): Boolean;
begin
  Result := True;
  if (CurPageID = wpSelectDir) and not FileExists(AddBackslash(WizardDirValue) + 'There.exe') then
  begin
    MsgBox('There.exe was not found in:' + #13#10 + WizardDirValue + #13#10#13#10 +
      'Please choose your There client folder (the one containing There.exe).',
      mbError, MB_OK);
    Result := False;
  end;
end;

{ ---------- There has to be closed (the DLLs are locked while it runs) ---------- }

{ only a There.exe running from this folder counts, other installs are fine }
function IsThereRunningIn(const Dir: String): Boolean;
var
  Locator, Service, Procs, P: Variant;
  I: Integer;
  Want: String;
begin
  Result := False;
  Want := Lowercase(AddBackslash(Dir) + 'There.exe');
  try
    Locator := CreateOleObject('WbemScripting.SWbemLocator');
    Service := Locator.ConnectServer('.', 'root\CIMV2');
    Procs := Service.ExecQuery('SELECT ExecutablePath FROM Win32_Process WHERE Name = ''There.exe''');
    for I := 0 to Procs.Count - 1 do
    begin
      P := Procs.ItemIndex(I);
      if Lowercase(String(P.ExecutablePath)) = Want then
      begin
        Result := True;
        Exit;
      end;
    end;
  except
    Result := False;
  end;
end;

{ returning a message here stops setup (works in silent mode too) }
function PrepareToInstall(var NeedsRestart: Boolean): String;
begin
  Result := '';
  if IsThereRunningIn(WizardDirValue) then
    Result := 'There is running from this folder. Please close There completely and run setup again.';
end;

function InitializeUninstall: Boolean;
begin
  Result := True;
  if IsThereRunningIn(ExpandConstant('{app}')) then
  begin
    MsgBox('There is running. Please close There completely and run the uninstaller again.',
      mbError, MB_OK);
    Result := False;
  end;
end;

{ ---------- back up whatever we're about to overwrite ---------- }

function RelPath(const Full: String): String;
var
  Base: String;
begin
  Base := AddBackslash(ExpandConstant('{app}'));
  if CompareText(Copy(Full, 1, Length(Base)), Base) = 0 then
    Result := Copy(Full, Length(Base) + 1, MaxInt)
  else
    Result := ExtractFileName(Full);
end;

procedure BackupExisting;
var
  Dest, Rel, Bak, Marker, OldOrig: String;
begin
  Dest := ExpandConstant(CurrentFileName);
  Rel := RelPath(Dest);
  Bak := ExpandConstant('{app}\' + BackupSub + '\') + Rel;
  Marker := Bak + '.tmui-new';
  { already backed up by an earlier install, don't back up our own files }
  if FileExists(Bak) or FileExists(Marker) then
    Exit;
  ForceDirectories(ExtractFileDir(Bak));
  { the old .bat installer saved the real original as <Name>.orig.dll, use that }
  if (CompareText(Rel, 'BrowserProxy.dll') = 0) or (CompareText(Rel, 'FlashProxy.dll') = 0) then
  begin
    OldOrig := ExpandConstant('{app}\') + ChangeFileExt(Rel, '.orig.dll');
    if FileExists(OldOrig) then
    begin
      if CopyFile(OldOrig, Bak, False) then
        DeleteFile(OldOrig);
      Exit;
    end;
  end;
  if FileExists(Dest) then
    CopyFile(Dest, Bak, False)
  else
    SaveStringToFile(Marker, '', False);
end;

{ ---------- files older versions installed that we don't ship any more ----------
  Restore the player's original from the backup, or delete ours if they never
  had one. Keep the backup though: the old uninstall log still lists these
  files, so uninstall deletes them and RestoreTree has to put them back. }

procedure RetireFile(const Rel: String);
var
  Dest, Bak: String;
begin
  Dest := ExpandConstant('{app}\') + Rel;
  Bak := ExpandConstant('{app}\' + BackupSub + '\') + Rel;
  if FileExists(Bak) then
    CopyFile(Bak, Dest, False)
  else if FileExists(Bak + '.tmui-new') then
    DeleteFile(Dest);
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssPostInstall then
  begin
    { early test builds overwrote TheChaz's Command Bar }
    RetireFile('Resources\shortcutbar\shortcutbar2.js');
    RetireFile('Resources\shortcutbar\shortcutbar2.json');
  end;
end;

{ ---------- uninstall: put the originals back ---------- }

procedure RestoreTree(const BakDir, DestDir: String);
var
  F: TFindRec;
  Src, Dst: String;
begin
  if FindFirst(AddBackslash(BakDir) + '*', F) then
  try
    repeat
      if (F.Name <> '.') and (F.Name <> '..') then
      begin
        Src := AddBackslash(BakDir) + F.Name;
        Dst := AddBackslash(DestDir) + F.Name;
        if F.Attributes and FILE_ATTRIBUTE_DIRECTORY <> 0 then
          RestoreTree(Src, Dst)
        else if CompareText(ExtractFileExt(F.Name), '.tmui-new') <> 0 then
        begin
          ForceDirectories(ExtractFileDir(Dst));
          CopyFile(Src, Dst, False);
        end;
      end;
    until not FindNext(F);
  finally
    FindClose(F);
  end;
end;

procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
var
  BakRoot: String;
begin
  if CurUninstallStep = usPostUninstall then
  begin
    BakRoot := ExpandConstant('{app}\' + BackupSub);
    if DirExists(BakRoot) then
    begin
      RestoreTree(BakRoot, ExpandConstant('{app}'));
      DelTree(ExpandConstant('{app}\ThereModernUI'), True, True, True);
    end;
  end;
end;
